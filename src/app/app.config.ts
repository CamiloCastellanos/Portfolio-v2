import { ApplicationConfig, provideBrowserGlobalErrorListeners, APP_INITIALIZER, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideTransloco, TranslocoService } from '@ngneat/transloco';
import { TranslocoHttpLoader } from './shared/services/transloco-http-loader';
import { firstValueFrom } from 'rxjs';
import { LanguageDetector } from './shared/services/language-detector';

const firebase = {
  apiKey: "AIzaSyCPo7JTRBbDoU2yIbhbTNREWACO7xlkMew",
  authDomain: "portafolioangular-4f64f.firebaseapp.com",
  databaseURL: "https://portafolioangular-4f64f.firebaseio.com",
  projectId: "portafolioangular-4f64f",
  storageBucket: "portafolioangular-4f64f.appspot.com",
  messagingSenderId: "465578885884",
  appId: "1:465578885884:web:ce4edca29843abe4940d79",
  measurementId: "G-7C4MYXWBW9"
}

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
    provideFirebaseApp(() => initializeApp(firebase)),
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
    }
  ]
};
