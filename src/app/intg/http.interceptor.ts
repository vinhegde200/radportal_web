import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { from, mergeMap } from 'rxjs';
import { SsoService } from '../sso/sso.service';

export const demoInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const keySer = inject(SsoService);

    if (req.url != "/api/global/configurations123") {
        return from (keySer.getToken()).pipe(mergeMap((token: string) => {
            const authReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            return next(authReq);
        }));
    } else {
        return next(req);
    }
};