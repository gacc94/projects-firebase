import { ApplicationConfig, enableProdMode, Provider, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { Auth, getAuth, provideAuth } from '@angular/fire/auth';
import { Firestore, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment.dev';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AUT_PROVIDERS } from './features/auth/infrastructure/providers/auth.provider';
import { SHARED_PROVIDERS } from './shared/providers/shared.provider';
import { SAVING_RECORD_PROVIDERS } from './features/dashboard/features/saving-record/infrastructure/providers/saving-record.provider';

export const APP_CONFIG_PROVIDERS: Array<Provider> = [
  ...SHARED_PROVIDERS,
  ...AUT_PROVIDERS,
  ...SAVING_RECORD_PROVIDERS
]

if (environment.production) {
  enableProdMode();
}

export const appConfig: ApplicationConfig = {
  providers: [
    ...APP_CONFIG_PROVIDERS,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth((): Auth => {
      const auth: Auth = getAuth();
      // connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
      return auth;
    }),
    provideFirestore((): Firestore => {
      const firestore: Firestore = getFirestore();
      // connectFirestoreEmulator(firestore, 'http://localhost', 9098);
      return firestore;
    }),
    provideHttpClient(withFetch())
  ]
};
