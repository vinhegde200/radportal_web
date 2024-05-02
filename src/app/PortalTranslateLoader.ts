import { HttpClient } from "@angular/common/http";
import { TranslateLoader } from "@ngx-translate/core";
import { Observable, flatMap, mergeMap, of } from "rxjs";

export class PortalTranslateLoader implements  TranslateLoader {
    constructor(private http: HttpClient) {}
    getTranslation(lang: string): Observable<any> {
        return this.http.get(`/api/global/translations/${lang}`)
            .pipe(mergeMap((data: any) => {
                let tx: any = data.data.txjson;
                tx = JSON.parse(tx);
                return of(tx);
            }));
    }
}