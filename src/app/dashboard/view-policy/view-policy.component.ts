import { Component, OnInit } from '@angular/core';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Policies} from '../../../app/shared/models/policy.model'
import {PolicyService} from 'src/app/services/policy.service';


@Component({
  selector: 'app-view-policy',
  templateUrl: './view-policy.component.html',
  styleUrls: ['./view-policy.component.css'],
  providers: [NgbModalConfig, NgbModal]
})

export class ViewPolicyComponent implements OnInit {
  public date: Date = new Date();
  model = 1;
  policies;
  //policies:Policies[];
  // policies = [ {
  //   id:1,
  //   name: 'Policy 1',
  //   lastUpdated: 'f/f3/Flag_of_Russia.svg',
  //   status: true,
  // }, {
  //   id:2,
  //   name: 'Policy 2',
  //   lastUpdated: 'f/f3/Flag_of_Russia.svg',
  //   status: false,
  // }]
  constructor(config: NgbModalConfig, private modalService: NgbModal,private policyService: PolicyService, ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  getActiveTab(){
    this.policyService.activeTab;
  }
  open(content) {
    this.modalService.open(content);
  }

  ngOnInit(): void {
    this.getPolicies();
  }
  getPolicies() {  
    // console.log(this.policyService.getPolicies());
    // const data = this.policyService.getPolicies();
    // this.policies = data;

    let result = this.policyService.getPolicies().subscribe(
      data => {
      this.policies = data;
      // console.log(this.policies);
      });;
   
  }

}
