import { animate, state, style, transition, trigger } from '@angular/animations';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ResizeService } from '../components/size-detector/resize.service';
import { SCREEN_SIZE } from '../components/size-detector/screen-size.enum';
import { ValidateEmail } from '../_helpers/validator';
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
            state('signInLeft signUpRight', style({
                transform: 'translate(0, 0)'
            })),
            state('signUpLeft', style({
                transform: 'translate(-100%, 0)'
            })),
            // state('signUpRight', style({
            //     transform: 'translate(0, 0)'
            // })),
            state('signInTop', style({
                transform: 'translate(0, 100%)'
            })),
            state('signUpBottom', style({
                transform: 'translate(0, -100%)'
            })),
            state('signInBottom signUpTop', style({
                transform: 'translate(0, 0)'
            })),
            transition(
              `signInLeft => signInRight, signInRight => signInLeft, signUpLeft => signUpRight, signUpRight => signUpLeft`, [
              animate('0.5s')
            ]),
            transition(
                `signInBottom => signInTop, signInTop => signInBottom, signUpTop => signUpBottom, signUpBottom => signUpTop`, [
                animate('0.5s')
              ]),
            // transition('signInRight => signInLeft', [
            //   animate('0.5s')
            // ]),
            // transition('signUpLeft => signUpRight', [
            //   animate('0.5s')
            // ]),
            // transition('signUpRight => signUpLeft', [
            //   animate('0.5s')
            // ]),
          ])
    ]
})

export class AuthComponent implements OnInit, OnDestroy {
    isLoginMode: boolean = true;
    loginSubscription: Subscription;
    resizeServiceSubscription: Subscription;
    form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email, ValidateEmail]),
        password: new FormControl('', [Validators.required,])
    })
    log = console.log;

    constructor(
      private router: Router,
      private authService: AuthService,
      private toastr: ToastrService,
      private resizeService: ResizeService
    ) { 
        this.resizeServiceSubscription = this.resizeService.onResize$.subscribe((x: SCREEN_SIZE) => {
            this.size = x;
          });
    }

    size: SCREEN_SIZE

    isInvalid(controlField: string) {
        const field = this.form.get(controlField) || {invalid: '', dirty: '', touched: ''};
        return field.invalid && (field.dirty || field.touched)
    }

    hasError(controlField: string, error: string): boolean {
        return this.form.get(controlField).hasError(error)
    }

    private getValue(controlField: string): string {
        return this.form.get(controlField).value
    }

    slideFor(screen?: string) {
        const smaillDevice = [SCREEN_SIZE.XS, SCREEN_SIZE.SM].includes(this.size);
        if (screen === 'signUp') {
            if (this.isLoginMode) {
                return smaillDevice ? 'signUpTop' : 'signUpRight'
            }
            return smaillDevice ? 'signUpBottom' : 'signUpLeft'
            // return this.isLoginMode ? 'signUpRight': 'signUpLeft' 
        }

        if (this.isLoginMode) {
            return smaillDevice ? 'signInBottom' : 'signInLeft'
        }
        return smaillDevice ? 'signInTop' : 'signInRight'
        // return this.isLoginMode ? 'signInLeft' : 'signInRight'
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
        this.form.reset();
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
        this.resizeServiceSubscription.unsubscribe();
    }

    handleError(errors) {
        if(!!errors['non_field_errors']) {
            this.toastr.error(errors["non_field_errors"])
        }

        Object.entries(errors).forEach(([key,value]) => {
            const errorKey = `${key}Error`;
            this.form.controls[key].setErrors({[errorKey]: value});
        });
    }
    

    onSubmit() {
        if (!this.form.valid) {
            return;
        }
        
        const email = this.getValue('email');
        const password = this.getValue('password');
        if (this.isLoginMode) {
            this.authService.login(email, password).subscribe(
                (responseData) => {
                    this.router.navigate(['/dashboard']);
                },
                (errors) => {this.handleError(errors)}
            );
        } else {
            this.authService.signUp(email, password).subscribe(
                (responseData) => {
                    this.onSwitchMode();
                    this.form.reset();
                    this.toastr.success('Signup successfully please relogin with the newly created crediantials');
                },
                (errors) => {this.handleError(errors)}
            );
        }
    }
}