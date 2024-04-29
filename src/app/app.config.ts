import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { demoInterceptor } from './intg/http.interceptor';
import { SsoService } from './sso/sso.service';
import { KeycloakService } from 'keycloak-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    SsoService,
    KeycloakService,
    provideRouter(routes, withHashLocation()),
    provideHttpClient(withInterceptors([demoInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory(sso: SsoService) {
        return (): Promise<any> => {
          return sso.initializeSSO();
        }
      },
      multi: true,
      deps: [ SsoService ]
    },
    SsoService,
    provideAnimations()
  ]
};
