import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(
        @Inject('BASE_API_URL') private baseUrl: string
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const url = `${this.baseUrl}${req.url}`;


        if ([`/api/login/`, `/api/user/`].includes(req.url)) {
            const modifyReq = req.clone({url})
            return next.handle(modifyReq);
        }

        const {token = ''} = JSON.parse(localStorage.getItem('userData') || '{}')
        let headers = req.headers.append('Cache-Control', 'no-cache')
        headers = headers.append('Pragma', 'no-cache')
        headers = headers.append("Authorization", `Token ${token}`)

        const modifyReq = req.clone({
            url,
            headers
        })
        return next.handle(modifyReq);
    }
}