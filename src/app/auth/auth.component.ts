import { animate, state, style, transition, trigger } from '@angular/animations';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';



@Component({
    templateUrl: './auth.component.html',
    selector: 'app-auth',
    animations: [
        trigger('slide', [
            // ...
            state('signInRight', style({
                transform: 'translate(100%, 0)'
            })),
            state('signInLeft', style({
                transform: 'translate(0, 0)'
            })),
            state('signUpLeft', style({
                transform: 'translate(-100%, 0)'
            })),
            state('signUpRight', style({
                transform: 'translate(0, 0)'
            })),
            transition('signInLeft => signInRight', [
              animate('0.5s')
            ]),
            transition('signInRight => signInLeft', [
              animate('0.5s')
            ]),
            transition('signUpLeft => signUpRight', [
                animate('0.5s')
              ]),
              transition('signUpRight => signUpLeft', [
                animate('0.5s')
              ]),
          ])
    ]
})

export class AuthComponent implements OnInit, OnDestroy {
    @ViewChild('f', { read: NgForm }) f: any;
    isLoginMode: boolean = true;
    loginSubscription: Subscription;

    constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
        this.f.resetForm();
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