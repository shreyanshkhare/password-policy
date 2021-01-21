import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import {PolicyService} from 'src/app/services/policy.service';
import { ToastrService } from 'ngx-toastr';
import {Policies} from '../../../app/shared/models/policy.model'
@Component({
  selector: 'app-add-policy',
  templateUrl: './add-policy.component.html',
  styleUrls: ['./add-policy.component.css']
})
export class AddPolicyComponent implements OnInit {
  submitted = false;
  addPolicyForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private policyService: PolicyService,private toastr: ToastrService,) { }
  
  ngOnInit(): void {
    this.addPolicyForm = this.formBuilder.group({      
      name: ['', Validators.required],
      min_length: ['', Validators.required],
      exp_interval: [Number('')],
      pwd_history: [Number('')],
      is_alpha_numeric: [''],
      contains_username: [false],
      must_mixed: [],
      status: [false],
      excludeList: ''
    });
  }
  get policyFormControl() {
    return this.addPolicyForm.controls;
  }
  reset() {
    this.addPolicyForm.reset();
    this.submitted = false;
  }
  onSubmit() {
    this.submitted = true;
    if (this.addPolicyForm.valid) {
      this.policyService.addPolicy(this.addPolicyForm.value)
      .subscribe( data => {
        this.toastr.success('Policy has been created!');
        console.log(data);
        this.addPolicyForm.reset();  
        this.submitted = false;      
      });    
     
    }else{
      this.toastr.error('Please enter required field!');
      //console.log("form is invalid");
    }
    
  }
  
}
