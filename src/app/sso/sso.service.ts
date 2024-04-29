import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { KeycloakService } from "keycloak-angular";
import { Configuration } from "../model/config.model";
import { of } from "rxjs";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class SsoService {
    configs: any = {};
    ssoProvider: string = '';
    keycloak: KeycloakService;
    constructor(private http: HttpClient, private router: Router) {
        this.keycloak = inject(KeycloakService);
    }

    initializeSSO() {
        return new Promise(async (resolve: any, reject: any) => {
            this.http.get("/api/global/configurations")
            .subscribe({
                next: async (res: any) => {
                    let _configs: Configuration[] = res.data as Configuration[];
                    this.configs = _configs.reduce((o: any, _c: Configuration) => {
                        o[_c.key] = _c.value
                        return o
                    }, {});
                    this.ssoProvider = this.configs['SsoMethod'];
                    if (this.ssoProvider == "KeyCloak") {
                        await this.initializeKeycloak(this.getKeyCloakConfig());
                    }
                    resolve(true);
                },
                error: (err: any) => {
                    console.log(err);
                    resolve(true);
                }
            });
        });
    }

    private getKeyCloakConfig() {
        const kconfig = {
            config: {
                url: this.configs["KeyCloak:AuthServerUrl"],
                realm: this.configs["KeyCloak:Realm"],
                clientId: this.configs["KeyCloak:Resource"],
            },
            initOptions: {
                pkceMethod: this.configs["KeyCloak:initOptions:pkceMethod"],
                redirectUri: this.configs["KeyCloak:initOptions:redirecturl"],
                checkLoginIframe: this.configs["KeyCloak:initOptions:checkLoginIframe"],
                // onLoad: 'check-sso'
            }
        };
        return kconfig;
    }

    isLoggedIn() {
        if (this.ssoProvider == 'KeyCloak') {
            return this.keycloak.isLoggedIn();
        } else {
            return this.getCookieValue('_token') != ''
        }
    }

    login(options: any, company?: string) {
        if (this.ssoProvider == 'KeyCloak') {
            this.keycloak.login(options);
        } else {
            if (options.prompt == 'none') {
                window.location.href = options.redirectUri;
            } else {
                this.router.navigate(['login', company], { queryParams: {redirect: options.redirectUri}});
            }
        }
    }

    logout(url: string) {
        if (this.ssoProvider == 'KeyCloak') {
            this.keycloak.logout(url);
        } else {
            this.http.get("/api/access/logout")
            .subscribe({
                next: (res: any) => {
                    window.location.href = url;
                }
            });
        }
    }

    getToken(): Promise<string> {
        if (this.ssoProvider == 'KeyCloak') {
            return this.keycloak.getToken();
        } else {
            return Promise.resolve(this.getCookieValue('_token'));
        }
    }

    initializeKeycloak(kkConfig: any) {
        // const conf = JSON.parse(kkConfig);
        return this.keycloak.init(kkConfig);
    }

    getCookieValue(name: string) {
        const val = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '';
        return val; 
    }
}