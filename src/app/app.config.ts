import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { Auth, getAuth, provideAuth } from '@angular/fire/auth';
import { Firestore, getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp({
      "projectId": "crud-auth-ang18",
      "appId": "1:683541430785:web:0e2e3b0d4fd7842b65b600",
      "storageBucket": "crud-auth-ang18.appspot.com",
      "apiKey": "AIzaSyCbtUwncpuDYiKKkD5LRi5eyvyKX0AnLss",
      "authDomain": "crud-auth-ang18.firebaseapp.com",
      "messagingSenderId": "683541430785"
    })),
    provideAuth((): Auth => getAuth()),
    provideFirestore((): Firestore => getFirestore())
  ]
};
