import { Component, OnInit } from '@angular/core';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Policies} from '../../../app/shared/models/policy.model'
import {PolicyService} from 'src/app/services/policy.service';
import { ToastrService } from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MustMatch} from 'src/app/_helpers/must-match.validator'

import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-policy',
  templateUrl: './view-policy.component.html',
  styleUrls: ['./view-policy.component.css'],
  providers: [NgbModalConfig, NgbModal]
})

export class ViewPolicyComponent implements OnInit {
  public date: Date = new Date();
  model = 1;
  passwordPolicyId;
  policies;
  changePasswordForm: FormGroup;
  submitted = false;
  passwordIncorrect = false;
  
  deletePolicyId;
  PolicyName;
  constructor(config: NgbModalConfig,
    private modalService: NgbModal,private policyService: PolicyService,
    private formBuilder: FormBuilder,private toastr: ToastrService, private authService: AuthService,
    private router: Router) {
      // customize default values of modals used by this component tree
      config.backdrop = 'static';
      config.keyboard = false;
    }
    
    getActiveTab(){
      this.policyService.activeTab;
    }
    open(content,id) {
      console.log(id);
      this.passwordPolicyId = id;
      this.modalService.open(content);
      
    }
    openDeleteModal(contentDelete,id,name) {
      this.modalService.open(contentDelete,{ centered: true });
      this.deletePolicyId = id;
      this.PolicyName = name;
    }
    
    ngOnInit(): void {
      this.getPolicies();
      
      this.changePasswordForm = this.formBuilder.group({    
        old_password: ['', Validators.required],
        new_password: ['', [Validators.required, Validators.minLength(9)]],
        confirm_password: ['', Validators.required]   
      }, {
        validator: MustMatch('new_password', 'confirm_password')
      });
    }
    get policyControl(){
      return this.changePasswordForm.controls;
    }
    getPolicies() {   
      let result = this.policyService.getPolicies().subscribe(
        data => {
          this.policies = data;    
        });   
      }
      
      onSubmit() {
        
        this.submitted = true;
        if (!this.changePasswordForm.invalid) {   
          const obj = this.changePasswordForm.value;
          delete obj.confirm_password;
          obj.policy_id = this.passwordPolicyId;    
          this.policyService.changePassword(obj)
          .subscribe( data => {
            console.log(data);
            if(data[0] !== undefined) {
              if(data[0].old_password) {               
                this.toastr.error("Your Current Password Is Incorrect!");
              }
              else if(data[0].new_password){
                console.log()
                this.toastr.error(data[0].new_password);
              }
            }             
            else{
              this.toastr.success("Success! Your Password has been changed. Redirecting to login Page.");
              this.modalService.dismissAll();
              setTimeout(() => {
                this.authService.logout();
                this.router.navigate(['/auth']);
              }, 4000);
            }
            
          });
        }   
      }
      
      
      deletePolicy() {
        this.policyService.deletePolicy(this.deletePolicyId)
        .subscribe( data => {
          console.log(data);
          this.deletePolicyId;
          this.toastr.success("Policy has been successfully deleted");
          this.modalService.dismissAll();
          this.getPolicies();
        })      
      };
      
      
    }
    