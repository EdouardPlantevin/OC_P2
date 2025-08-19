import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import {routes} from './app.routes';
import {ErrorInterceptor} from "./core/services/error.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes, withComponentInputBinding()),
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
};
