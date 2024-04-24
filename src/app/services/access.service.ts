import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AppUserData, Branding, ConsumerCompany } from "../model/access.model";

@Injectable({providedIn: 'root'})
export class AccessService {

    companySubject = new Subject<ConsumerCompany>();
    brandingSubject = new Subject<Branding>()
    userSubject = new Subject<AppUserData>();

    constructor(private http: HttpClient) {

    }

    login(loginid: string, password: string) {
        return this.http.post("/api/access/login", {loginid, password});
    }

    validateUser() {
        return this.http.get("/api/access/validate");
    }

    getRoleAndPermission() {
        return this.http.get("/api/access/permissions");
    }

    getCompany(compName: string) {
        return this.http.get(`/api/branding/company/${compName}`);
    }

    getBranding(compName: string) {
        return this.http.get(`/api/branding/${compName}`);
    }
}