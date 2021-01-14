import {Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
    templateUrl: './auth.component.html',
    selector: 'app-auth'
})

export class AuthComponent implements OnInit, OnDestroy {
    isLoginMode: boolean = true;
    loginSubscription: Subscription;

    constructor(private router: Router, private authService: AuthService) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSuccess = () => {
        this.router.navigate(['/dashboard']);
    }

    ngOnInit() {
        this.loginSubscription = this.authService.user.subscribe(user => {
            this.onSuccess();
        })
    }

    ngOnDestroy() {
        this.loginSubscription.unsubscribe();
    }
    

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        
        const email = form.value.email;
        const password = form.value.password;
        if (this.isLoginMode) {
            this.authService.login(email, password, this.onSuccess);
        } else {
            this.authService.signUp(email, password, this.onSuccess);
        }
    }
}