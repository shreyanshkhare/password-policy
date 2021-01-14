import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";

// ideallay create a model, will do that once we connect to the backend
class User {
    constructor(public email: string) {}
}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    authObservable = new Observable();

    constructor(private router: Router) {}

    private successHandler(email: string, onSuccess: Function) {
        const user = new User(email);
        localStorage.setItem('userData', JSON.stringify(user));
        this.user.next(user);
        onSuccess();
    }

    signUp(email: string, password: string, afterSuccess: Function) {
        this.successHandler(email, afterSuccess);
    }

    login(email: string, password: string, afterSuccess: Function) {
        return this.successHandler(email, afterSuccess);
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