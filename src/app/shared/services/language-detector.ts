import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageDetector {
  getBrowserLanguage(): string {
    const browserLang = navigator.language || (navigator as any).userLanguage;
    const mainLang = browserLang.split('-')[0];
    return mainLang;
  }

  getValidLanguage(availableLangs: string[]): string | null {
    const browserLang = this.getBrowserLanguage();
    if (availableLangs.includes(browserLang)) {
      return browserLang;
    }
    const partialMatch = availableLangs.find(lang =>
      browserLang.startsWith(lang)
    );
    if (partialMatch) {
      return partialMatch;
    }
    return null;
  }

  getSavedLanguage(): string | null {
    return localStorage.getItem('userLanguage');
  }

  saveLanguage(lang: string): void {
    localStorage.setItem('userLanguage', lang);
  }
}
