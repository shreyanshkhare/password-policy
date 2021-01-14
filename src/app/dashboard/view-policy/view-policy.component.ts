import { Component, OnInit } from '@angular/core';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
interface Policy {
  name: string;
  lastUpdated: string;
  status: boolean;
}

const POLICIES: Policy[] = [
  {
    name: 'Policy 1',
    lastUpdated: 'f/f3/Flag_of_Russia.svg',
    status: false,
  },
  {
    name: 'Policy 2',
    lastUpdated: 'c/cf/Flag_of_Canada.svg',
    status: false,
  },
  {
    name: 'Policy 3',
    lastUpdated: 'a/a4/Flag_of_the_United_States.svg',
    status: true,
  },
  {
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
  policies = POLICIES;
  
  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit(): void {
  }

}
