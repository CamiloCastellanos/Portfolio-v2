import { ApplicationConfig, provideBrowserGlobalErrorListeners, APP_INITIALIZER, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideTransloco, TranslocoService } from '@ngneat/transloco';
import { TranslocoHttpLoader } from './shared/services/transloco-http-loader';
import { firstValueFrom } from 'rxjs';
import { LanguageDetector } from './shared/services/language-detector';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { environment } from '../environments/environmet';

function initializeTransloco() {
  const translocoService = inject(TranslocoService);
  const languageDetector = inject(LanguageDetector);

  return () => {
    const availableLangs = ['en', 'es'];
    let defaultLang = 'en';

    const savedLang = languageDetector.getSavedLanguage();
    if (savedLang && availableLangs.includes(savedLang)) {
      defaultLang = savedLang;
    } else {
      const browserLang = languageDetector.getValidLanguage(availableLangs);
      if (browserLang) {
        defaultLang = browserLang;
        languageDetector.saveLanguage(defaultLang);
      }
    }
    translocoService.setActiveLang(defaultLang);
    return firstValueFrom(translocoService.load(defaultLang));
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideTransloco({
      config: {
        availableLangs: ['es', 'en'],
        defaultLang: 'es',
        reRenderOnLangChange: true,
        prodMode: false
      },
      loader: TranslocoHttpLoader
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeTransloco,
      multi: true
    },
    provideHotToastConfig()
  ]
};
