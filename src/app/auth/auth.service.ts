import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {User} from "./user.modal";

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    authObservable = new Observable();

    constructor(private router: Router, private httpClient: HttpClient) {}

    handleError(errRes: HttpErrorResponse) {
        if (!errRes.error) {
            return throwError('An unknown error occurred!');
        }

        return throwError(errRes.error);
    }

    signUp(email: string, password: string) {
        return this.httpClient.post(
            '/api/user/',
            {
                email, password
            },
        ).pipe(
            catchError(this.handleError)
        )
    }

    login(email: string, password: string) {
        return this.httpClient.post(
            '/api/login/',
            {
                username: email, password
            },
        ).pipe(
            catchError(this.handleError),
            tap(
                (responseData: any) => {
                    const {email, token, user_id: userId } = responseData;
                    const user = new User(email, token, userId);
                    localStorage.setItem('userData', JSON.stringify(user));
                    this.user.next(user);
                }
            )
        )
    }

    logout() {
        this.user.next(null);
        localStorage.removeItem('userData');
        this.router.navigate(['./auth']);
    }

    autoLogin() {
        const user = JSON.parse(localStorage.getItem('userData'));
        this.user.next(user);
    }
}