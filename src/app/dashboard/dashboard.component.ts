import { Component, OnInit } from '@angular/core';
import {PolicyService} from 'src/app/services/policy.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  active = this.getActiveTab();
  constructor(private policyService: PolicyService,) { }
  
  ngOnInit(): void {
    this.getActiveTab()
  }

  
  getActiveTab(){    
    return this.policyService.activeTab;   
   }
   }
