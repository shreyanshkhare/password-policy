import { Component, OnInit } from '@angular/core';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Policies} from '../../../app/shared/models/policy.model'
import {PolicyService} from 'src/app/services/policy.service';

const POLICIES: Policies[] = [
  {
    id:1,
    name: 'Policy 1',
    lastUpdated: 'f/f3/Flag_of_Russia.svg',
    status: false,
  },
  {
    id:2,
    name: 'Policy 2',
    lastUpdated: 'c/cf/Flag_of_Canada.svg',
    status: false,
  },
  {
    id:3,
    name: 'Policy 3',
    lastUpdated: 'a/a4/Flag_of_the_United_States.svg',
    status: true,
  },
  {
    id:3,
    name: 'Policy 4',
    lastUpdated: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    status: false,
 
  }
];


@Component({
  selector: 'app-view-policy',
  templateUrl: './view-policy.component.html',
  styleUrls: ['./view-policy.component.css'],
  providers: [NgbModalConfig, NgbModal]
})

export class ViewPolicyComponent implements OnInit {
  public date: Date = new Date();
  model = 1;
  policies: Array<Policies>;
  
  constructor(config: NgbModalConfig, private modalService: NgbModal,private policyService: PolicyService, ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit(): void {
    this.getPolicies();
  }
  getPolicies() {
   console.log(this.policies);
    this.policyService.getPolicies();
  }

}
