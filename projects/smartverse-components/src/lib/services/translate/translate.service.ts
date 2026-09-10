import {isPlatformBrowser} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Inject, Injectable, InjectionToken, Optional, PLATFORM_ID} from '@angular/core';
import {map, Observable, of, switchMap} from 'rxjs';
import {
  SMARTVERSE_COMPONENTS_CONFIG,
  SmartverseComponentsConfig,
} from '../../config/smartverse-components.config';

export interface TranslationOverride {
  language: string;
  translationKey: string;
  value: string;
}

export interface TranslationOverridesLoader {
  load(language: string): Observable<TranslationOverride[]>;
}

export const SMARTVERSE_TRANSLATION_OVERRIDES = new InjectionToken<TranslationOverridesLoader>(
  'SMARTVERSE_TRANSLATION_OVERRIDES',
);

@Injectable({providedIn: 'root'})
export class TranslateService {
  private translations: Record<string, string> = {};
  private defaults: Record<string, string> = {};
  private language: string;

  constructor(
    private readonly http: HttpClient,
    @Inject(PLATFORM_ID) private readonly platformId: object,
    @Inject(SMARTVERSE_COMPONENTS_CONFIG) private readonly config: SmartverseComponentsConfig,
    @Optional() @Inject(SMARTVERSE_TRANSLATION_OVERRIDES)
    private readonly overridesLoader: TranslationOverridesLoader | null,
  ) {
    this.language = config.defaultLanguage;
  }

  loadTranslations(): Observable<void> {
    if (isPlatformBrowser(this.platformId)) {
      const browserLanguage = navigator.language ?? this.config.defaultLanguage;
      this.language = this.resolveLanguage(browserLanguage);
    }
    return this.loadLanguage(this.language);
  }

  loadTranslationsUser(language: string): Observable<void> {
    return this.loadLanguage(this.resolveLanguage(language));
  }

  loadLanguage(language: string, includeOverrides = true): Observable<void> {
    this.language = this.resolveLanguage(language);
    return this.getDefaultTranslations(this.language).pipe(
      switchMap(defaults => {
        this.defaults = defaults;
        this.translations = {...defaults};
        if (!includeOverrides || !this.overridesLoader) return of(void 0);
        return this.overridesLoader.load(this.language).pipe(
          map(overrides => {
            for (const override of overrides) {
              this.translations[override.translationKey] = override.value;
            }
          }),
        );
      }),
    );
  }

  getDefaultTranslations(language = this.language): Observable<Record<string, string>> {
    const base = this.config.translationAssetsPath.replace(/\/$/, '');
    return this.http.get<Record<string, string>>(`${base}/${this.resolveLanguage(language)}.json`);
  }

  currentLanguage(): string { return this.language; }
  defaultTranslations(): Record<string, string> { return {...this.defaults}; }
  translate(key: string): string { return this.translations[key] ?? key; }

  private resolveLanguage(language: string): string {
    const mapped = this.config.supportedLanguages[language];
    if (mapped) return mapped;
    if (language.toLowerCase().startsWith('en')) return 'en-US';
    if (language.toLowerCase().startsWith('es')) return 'es-ES';
    if (language.toLowerCase().startsWith('pt')) return 'pt-BR';
    return this.config.defaultLanguage;
  }
}
