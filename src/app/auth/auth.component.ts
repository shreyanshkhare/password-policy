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
    alertObj = null;

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

    handleError(error) {
        if(Object.keys(error).includes('non_field_errors')) {
            this.alertObj = {
                status: 'error',
                message: error["non_field_errors"]
            }
        }
    }
    

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        
        const email = form.value.email;
        const password = form.value.password;
        if (this.isLoginMode) {
            this.authService.login(email, password).subscribe(
                (responseData) => {
                    this.router.navigate(['/dashboard']);
                },
                this.handleError
            );
        } else {
            this.authService.signUp(email, password).subscribe(
                (responseData) => {
                    this.onSwitchMode();
                    form.reset();
                    this.alertObj = {
                        status: 'success',
                        message: 'Signup successfully please relogin with the newly created crediantials'
                    }
                    setTimeout(() => {
                        this.alertObj = null;
                    }, 5000);
                },
                this.handleError
            );
        }
    }
}