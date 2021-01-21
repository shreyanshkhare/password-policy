import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(
        @Inject('BASE_API_URL') private baseUrl: string
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('baseUrl --->', this.baseUrl, 'app url --->>', req.url);
        const url = `${this.baseUrl}${req.url}`;

        if ([`/api/login/`, `/api/user/`].includes(req.url)) {
            const modifyReq = req.clone({url})
            return next.handle(modifyReq);
        }

        const {token = ''} = JSON.parse(localStorage.getItem('userData') || '{}')
        const modifyReq = req.clone({
            url,
            headers: req.headers.append("Authorization", `Token ${token}`)
        })
        return next.handle(modifyReq);
    }
}