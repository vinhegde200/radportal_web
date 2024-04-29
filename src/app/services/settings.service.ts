import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Configuration } from "../model/config.model";

@Injectable({providedIn: 'root'})
export class SettingsService {
    constructor(private http: HttpClient) {

    }

    getSettings() {
        return this.http.get("/api/global/configurations");
    }

    saveSettings(configs: Configuration[]) {
        return this.http.post("/api/global/configurations", configs);
    }
}