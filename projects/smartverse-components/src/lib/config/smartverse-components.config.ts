import {EnvironmentProviders, InjectionToken, makeEnvironmentProviders} from '@angular/core';
import {MessageService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';

export interface SmartverseComponentsConfig {
  translationAssetsPath: string;
  defaultLanguage: string;
  supportedLanguages: Record<string, string>;
  filterStoragePrefix: string;
  endpoints: {
    metadata: string;
    postalCode: string;
    requestUpload: string;
    requestDownload: string;
    deleteObject: string;
    screenReports: string;
    generateScreenReport: string;
  };
}

export interface SmartverseComponentsOptions extends Partial<Omit<SmartverseComponentsConfig, 'endpoints' | 'supportedLanguages'>> {
  endpoints?: Partial<SmartverseComponentsConfig['endpoints']>;
  supportedLanguages?: Record<string, string>;
}

export const DEFAULT_SMARTVERSE_COMPONENTS_CONFIG: SmartverseComponentsConfig = {
  translationAssetsPath: '/assets/i18n',
  defaultLanguage: 'pt-BR',
  supportedLanguages: {
    PORTUGUESE: 'pt-BR',
    ENGLISH: 'en-US',
    SPANISH: 'es-ES',
  },
  filterStoragePrefix: 'smartverse:datatable-filters',
  endpoints: {
    metadata: 'anonymous/rest/{service}/metadata',
    postalCode: 'lookupPostalCode',
    requestUpload: 'requestUpload',
    requestDownload: 'requestUrl',
    deleteObject: 'deleteObject',
    screenReports: 'getScreenReports',
    generateScreenReport: 'generateScreenReport',
  },
};

export const SMARTVERSE_COMPONENTS_CONFIG = new InjectionToken<SmartverseComponentsConfig>(
  'SMARTVERSE_COMPONENTS_CONFIG',
  {providedIn: 'root', factory: () => DEFAULT_SMARTVERSE_COMPONENTS_CONFIG},
);

export function provideSmartverseComponents(
  config: SmartverseComponentsOptions = {},
): EnvironmentProviders {
  const value: SmartverseComponentsConfig = {
    ...DEFAULT_SMARTVERSE_COMPONENTS_CONFIG,
    ...config,
    supportedLanguages: {
      ...DEFAULT_SMARTVERSE_COMPONENTS_CONFIG.supportedLanguages,
      ...config.supportedLanguages,
    },
    endpoints: {
      ...DEFAULT_SMARTVERSE_COMPONENTS_CONFIG.endpoints,
      ...config.endpoints,
    },
  };

  return makeEnvironmentProviders([
    {provide: SMARTVERSE_COMPONENTS_CONFIG, useValue: value},
    MessageService,
    DialogService,
  ]);
}
