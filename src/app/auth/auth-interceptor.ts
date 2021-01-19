import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (['/api/login/', '/api/user/'].includes(req.url)) {
            return next.handle(req);
        }

        const {token = ''} = JSON.parse(localStorage.getItem('userData') || '{}')
        const modifyReq = req.clone({headers: req.headers.append('Auth', `Basic ${token}`)})
        return next.handle(modifyReq);
    }
}