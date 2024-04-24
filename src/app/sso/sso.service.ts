import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { KeycloakService } from "keycloak-angular";
import { Configuration } from "../model/config.model";
import { of } from "rxjs";

@Injectable({providedIn: 'root'})
export class SsoService {
    configs: any = {};
    ssoProvider: string = '';
    keycloak: KeycloakService;
    constructor(private http: HttpClient) {
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
                    this.ssoProvider = this.configs['sso'];
                    if (this.configs['sso'] == 'keycloak' && this.configs['kk_configs']) {
                        await this.initializeKeycloak(this.configs['kk_configs']);
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

    isLoggedIn() {
        if (this.ssoProvider == 'keycloak') {
            return this.keycloak.isLoggedIn();
        } else {
            return false;
        }
    }

    login(options: any) {
        if (this.ssoProvider == 'keycloak') {
            this.keycloak.login(options);
        } else {
            alert('Other Method');
        }
    }

    logout(url: string) {
        if (this.ssoProvider == 'keycloak') {
            this.keycloak.logout(url);
        } else {
            alert('Other Method');
        }
    }

    getToken(): Promise<string> {
        if (this.ssoProvider == 'keycloak') {
            return this.keycloak.getToken();
        } else {
            return Promise.resolve('none');
        }
    }

    initializeKeycloak(kkConfig: any) {
        const conf = JSON.parse(kkConfig);
        return this.keycloak.init(conf);
    }
}