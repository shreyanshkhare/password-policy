import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {PolicyService} from 'src/app/services/policy.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  active = 'password-policies';
  constructor(private policyService: PolicyService,private route : ActivatedRoute) { }
  
  ngOnInit(): void {
    this.route.fragment.subscribe( (frag) => {this.active = frag || this.active});
  }

  
  // getActiveTab(){    
  //   return this.policyService.activeTab;   
  //  }
   }
