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
  constructor(private formBuilder: FormBuilder,private toastr: ToastrService,private http:HttpClient) { }

  ngOnInit() {
    // email.setValue('Nancy');
    this.registerForm = this.formBuilder.group({

        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required]],
        // password: ['', [Validators.required, Validators.minLength(6)]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        companyName: ['', Validators.required],
        country: ['', Validators.required],
        language:['', Validators.required]
    }, {
        validator: emailValidator('email', 'confirmEmail')
    });
}


onFormSubmit(data){
    console.log("in post request",data);

}

get f() { return this.registerForm.controls; }

onSubmit() {

    const data = this.registerForm.value
    console.log("onSubmit form data", data)
    this.submitted = true;   

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        this.toastr.error('Enter correct user details');

    }  
    else{
        console.log("form data sent")
        this.http
        .post('https://policypoc-default-rtdb.firebaseio.com/posts.json',
        data
        ).subscribe(responseData => {
            console.log("responseData", responseData);
            if (responseData){
            this.toastr.success("Thank you for filling in the form")
            }
        // },error =>{
        //     this.error = error.messages;
        //     console.log("error")
        // });
        });
        
    }
    console.log("form values",this.registerForm.value);
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
    //https://premchalmeti.com/pwd/api/user/
}
}
