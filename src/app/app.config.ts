import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { demoInterceptor } from './intg/http.interceptor';
import { SsoService } from './sso/sso.service';
import { KeycloakService } from 'keycloak-angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PortalTranslateLoader } from './PortalTranslateLoader';

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
    provideAnimations(),
    importProvidersFrom(
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }))
  ]
};

export function HttpLoaderFactory(http: HttpClient) {
  return new PortalTranslateLoader(http);
}