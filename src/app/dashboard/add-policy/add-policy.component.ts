import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import {PolicyService} from 'src/app/services/policy.service';

@Component({
  selector: 'app-add-policy',
  templateUrl: './add-policy.component.html',
  styleUrls: ['./add-policy.component.css']
})
export class AddPolicyComponent implements OnInit {
  submitted = false;
  addPolicyForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private policyService: PolicyService) { }
  
  ngOnInit(): void {
    this.addPolicyForm = this.formBuilder.group({      
      name: ['', Validators.required],
      min_length: ['', Validators.required],
      exp_interval: ['', Validators.required],
      pwd_history: ['', Validators.required],
      is_alpha_numeric: ['', Validators.required],
      contains_username: ['', Validators.required],
      must_mixed: ['', Validators.required],
      status: ['false', Validators.required],
      excludeList: ''
    });
  }
  get policyFormControl() {
    return this.addPolicyForm.controls;
  }
  
  onSubmit() {
    this.submitted = true;
    if (this.addPolicyForm.valid) {
      this.policyService.addPolicy(this.addPolicyForm.value)
      .subscribe( data => {
        console.log(data);
      });    
      this.addPolicyForm.reset();
    }else{
      console.log("form is invalid");
    }
    
  }
  
}
