import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject } from "rxjs";

// ideallay create a model, will do that once we connect to the backend
class User {
    constructor(public email: string) {}
}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    authObservable = new Observable();

    constructor(private router: Router, private httpClient: HttpClient) {}

    private successHandler(email: string, onSuccess: Function) {
        const user = new User(email);
        localStorage.setItem('userData', JSON.stringify(user));
        this.user.next(user);
        onSuccess();
    }

    signUp(email: string, password: string, afterSuccess: Function) {
        return this.successHandler(email, afterSuccess);
        return this.httpClient.post(
            '/api/user/',
            {
                email, password
            },
        ).subscribe(responseData => {
            console.log('responseData -->>', responseData)
        })
    }

    login(email: string, password: string, afterSuccess: Function) {
        return this.successHandler(email, afterSuccess);
        return this.httpClient.post(
            '/api/login/',
            {
                email, password
            },
        ).subscribe(responseData => {
            console.log('responseData -->>', responseData)
        })
        
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