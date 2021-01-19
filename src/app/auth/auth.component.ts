import {Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
    templateUrl: './auth.component.html',
    selector: 'app-auth'
})

export class AuthComponent implements OnInit, OnDestroy {
    isLoginMode: boolean = true;
    loginSubscription: Subscription;

    constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) {}

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

    handleError(errors, form) {
        if(!!errors['non_field_errors']) {
            this.toastr.error(errors["non_field_errors"])
        }

        Object.entries(errors).forEach(([key,value]) => {
            const errorKey = `${key}Error`;
            form.form.controls[key].setErrors({[errorKey]: value});
        });
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
                (errors) => {this.handleError(errors, form)}
            );
        } else {
            this.authService.signUp(email, password).subscribe(
                (responseData) => {
                    this.onSwitchMode();
                    form.reset();
                    this.toastr.success('Signup successfully please relogin with the newly created crediantials');
                },
                (errors) => {this.handleError(errors, form)}
            );
        }
    }
}