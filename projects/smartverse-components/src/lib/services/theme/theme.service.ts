import {DOCUMENT} from '@angular/common';
import {Inject, Injectable} from '@angular/core';
@Injectable({providedIn: 'root'})
export class ThemeService {
  constructor(@Inject(DOCUMENT) private readonly document: Document) {}
  setDarkMode(enabled: boolean): void { this.document.documentElement.classList.toggle('app-dark', enabled); }
  onConfigurationTheme(theme: string): void { this.setDarkMode(theme.toLowerCase().includes('dark')); }
}
