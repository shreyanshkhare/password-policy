import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import { MarkAsteriskDirective } from '../directives/mark-asterisk.directive';
import{ emailValidator } from './validator';
import { ToastrService } from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';

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
  userData;
  constructor(private formBuilder: FormBuilder,private toastr: ToastrService,private http:HttpClient) { }

  ngOnInit() {

      this.userData = JSON.parse(localStorage.getItem('userData'));
      this.userMail = this.userData['email'];
      this.userID = this.userData['userId'];
      this.registerForm = this.formBuilder.group({
          email: [this.userMail, [Validators.required, Validators.email]],
          // confirmEmail: ['', [Validators.required]],
        //   password: ['', [Validators.required, Validators.minLength(6)]],
          last_name: ['', Validators.required],
          first_name: ['', Validators.required],
          company_name: ['', Validators.required],
          country: ['India', Validators.required],
          preferred_language: ['', Validators.required]
    }, {
        // validator: emailValidator('email', 'confirmEmail')
    });
}


get f() { return this.registerForm.controls; }

onSubmit() {
    const data =this. registerForm.value
    console.log("onSubmit form data", data)
    this.submitted = true;   
    // const pdata = {email:this.userData['email'],
    // password:"test@123",
    // first_name:"test",
    // last_name:"test2",
    // company_name:"xoriant",
    // country:"India"}
    if (this.registerForm.invalid) {
        this.toastr.error('Enter correct user details');
    }  
    else{
        this.http
        .patch("/api/user/"+this.userID+'/',
        data
        ).subscribe(responseData => {
            console.log("responseData", responseData);
            if (responseData){
            this.toastr.success("Thank you for filling in the form")
            }
        },error =>{
            this.error = error.messages;
            console.log("error",this.error)
            this.toastr.error("Oops! Something went wrong..")
            this.registerForm.reset({
                email: this.userMail,
                country: "India",
                last_name: '',
                first_name:'',
                company_name:'',
                preferred_language:''
              });
            console.log("empty ")
              });
  
    }
    console.log("form values",this.registerForm.value);
}
onCancel(){
    this.registerForm.reset({
        email: this.userMail,
        country: "India",
        last_name: '',
        first_name:'',
        company_name:'',
        preferred_language:''
      });

}
}

