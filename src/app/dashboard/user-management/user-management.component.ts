import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import { MarkAsteriskDirective } from '../directives/mark-asterisk.directive';
import{ emailValidator } from './validator';
import { ToastrService } from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserDetailService} from './user-management.service';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})

export class UserManagementComponent implements OnInit {
  
  registerForm: FormGroup;
  submitted = false;
  error = null;
  userID;
  userMail
  UserDetails;
  formValid:Boolean= false;
  loader:Boolean= true;
  errormsg:Boolean= false;
  reset;

  constructor(private formBuilder: FormBuilder,private toastr: ToastrService,private http:HttpClient,
    private UserDetailService:UserDetailService, private NgbModal:NgbModal) { }


    ngOnInit() {

        this.userDetails()
        const userData = JSON.parse(localStorage.getItem('userData'))
        this.userID = userData['userId']


    }

userDetails(){

    this.UserDetailService.getUserDetails().subscribe(resData =>{
        this.loader = true;
        this.UserDetails = resData;
        if (this.UserDetails) {
            this.loader = false;
            this.formValid = true;
            this.registerForm = this.formBuilder.group({
                email: [this.UserDetails['email'], [Validators.required, Validators.email]],
                // confirmEmail: ['', [Validators.required]],
                //   password: ['', [Validators.required, Validators.minLength(6)]],
                last_name: [this.UserDetails['last_name'], Validators.required],
                first_name: [this.UserDetails['first_name'], Validators.required],
                company_name: [this.UserDetails['company_name'], Validators.required],
                country: [this.UserDetails['country'], Validators.required],
                preferred_language: [this.UserDetails['preferred_language'], Validators.required]
            });
            
        }
    }, error => {
        this.error = error.messages;
        this.errormsg = true;
        this.loader = false;
    });

}


open(content) {
    this.NgbModal.open(content);
  }

  close(content) {
    this.NgbModal.dismissAll(content);
}


get f() { return this.registerForm.controls; }


onSubmit(content) {
    const details =this. registerForm.value
    this.submitted = true;   
    if (this.registerForm.invalid) {
        this.toastr.error('Enter user details');
    }  
    else{
        this.UserDetailService.updateUserDetails(details).subscribe(responseData => {
            if (responseData){
            this.toastr.success("Thank you for filling in the form")
            this.NgbModal.dismissAll(content);
            this.reset = this. registerForm.value;
            this.UserDetails = this. registerForm.value;
        }
        },error =>{
            this.error = error.messages;
            this.toastr.error("Oops! Something went wrong..")
              });
  
    }

}
somethingChanged(){
    // console.log("Something changed in form")
}
onCancel(){
        this.registerForm.reset({
            email: this.UserDetails['email'],
            country: this.UserDetails['country'],
            last_name: this.UserDetails['last_name'],
            first_name:this.UserDetails['first_name'],
            company_name:this.UserDetails['company_name'],
            preferred_language:this.UserDetails['preferred_language']
          });

}
}

