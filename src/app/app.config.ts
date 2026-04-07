import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideTransloco } from '@ngneat/transloco';

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
      }
    })
  ]
};
