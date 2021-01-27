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
  checkboxActive = false;
  deletePolicyId;
  PolicyName;
  editForm: FormGroup;
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
      this.passwordPolicyId = id;
      this.modalService.open(content);      
    }
    openDeleteModal(contentDelete,id,name) {
      this.modalService.open(contentDelete,{ centered: true });
      this.deletePolicyId = id;
      this.PolicyName = name;
    }
    openEditModal(contentEdit,policy) {
      this.modalService.open(contentEdit,{ centered: true,size:'lg' });   
      this.PolicyName = policy.name;
      this.passwordPolicyId = policy.id;
      console.log(policy);
      this.setEditForm();
    }
    closeChangeModal(){
      this.modalService.dismissAll();
      this.changePasswordForm.reset()
    }
    eventCheck(event){      
      event.target.checked = false;
    }
    ngOnInit(): void {
      this.getPolicies();
      
      this.changePasswordForm = this.formBuilder.group({    
        old_password: ['', Validators.required],
        new_password: ['', Validators.required],
        confirm_password: ['', Validators.required]   
      }, {
        validator: MustMatch('new_password', 'confirm_password')
      });

      this.editForm = this.formBuilder.group({
        id: [''],
        name: ['', Validators.required],
        min_length: ['', Validators.required],
        min_number: [''],
        min_lowercase: [''],
        min_uppercase: [''],
        min_special_char: [], 
        contains_username:[false]     
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
      
      onChangeSubmit() {
        this.submitted = true;
        if (!this.changePasswordForm.invalid) {   
          const obj = this.changePasswordForm.value;
          delete obj.confirm_password;
          obj.policy_id = this.passwordPolicyId;    
          this.policyService.changePassword(obj)
          .subscribe( data => {
           
            if(data[0] !== undefined) {
              if(data[0].old_password) {               
                this.toastr.error("Your Current Password Is Incorrect!");
              }
              else if(data[0].new_password){

                this.toastr.error(data[0].new_password);
              }
            }             
            else{              
              this.checkboxActive = true;
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
          this.deletePolicyId;
          this.toastr.success(this.PolicyName+" Policy has been successfully deleted");
          this.modalService.dismissAll();
          this.getPolicies();
        })      
      };
      
      editPolicy(policy){
        let result = this.policyService.editPolicy(policy).subscribe(
          data => {
            
          }); 

      }
      onEditSubmit() {
        if (this.editForm.valid) {
          console.log(this.editForm.value);
          let result = this.policyService.updatePolicy(this.editForm.value).subscribe(
            data => {
              if(data){
                this.toastr.success(this.PolicyName+" Policy has been successfully updated");
                this.modalService.dismissAll();
                this.getPolicies();
              }
             
            }); 

        }
      }
    
      setEditForm() {
        console.log(this.passwordPolicyId);
        let item = this.policies.find(item => item.id === this.passwordPolicyId);
        console.log(item);
        
        this.editForm.patchValue({
          id: item.id,
          name:item.name,
          min_length:item.min_length,
          min_number: item.min_number,
          min_lowercase:item.min_lowercase,
          min_uppercase: item.min_uppercase,
          min_special_char: item.min_special_char,
          contains_username:item.contains_username          
        });

      }
    }
    