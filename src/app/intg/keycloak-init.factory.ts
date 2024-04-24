// import { HttpClient } from "@angular/common/http";
// import { KeycloakService } from "keycloak-angular";

// export function initializeKeycloak(
//   keycloak: KeycloakService,
//   http: HttpClient
//   ) {
//     return () =>
//       keycloak.init({
//         config: {
//           url: 'http://localhost:8080',
//           realm: 'com.epssw',
//           clientId: 'portal-app'
//         },
//         initOptions: {
//             pkceMethod: 'S256',
//             redirectUri: 'http://localhost:4200',
//             checkLoginIframe: false,
//             // onLoad: 'check-sso'
//         }
//     });
// }