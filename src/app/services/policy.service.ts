import { Injectable,ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {Policies} from '../shared/models/policy.model'


@Injectable({
  providedIn: 'root'
})

export class PolicyService {
  @ViewChild('ngbNav') ngbNav;

  // policies = [ {
  //   id:1,
  //   policyName: 'Policy 1',
  //   lastUpdated: 'f/f3/Flag_of_Russia.svg',
  //   status: true,
  // }, {
  //   id:2,
  //   policyName: 'Policy 2',
  //   lastUpdated: 'f/f3/Flag_of_Russia.svg',
  //   status: false,
  // }]
  activeTab = 1;
  constructor(private http: HttpClient) { }
  //constructor() { }


   getPolicies():Observable<Policies[]> {
    //  getPolicies() {
    //console.log("In service")
    const result = this.http.get<Policies[]>('/api/password_policy/');
  
    //return this.policies;
    return result
  }
  addPolicy(policy):Observable<Policies[]>{
    const result = this.http.post<Policies[]>('/api/password_policy/', policy)
    // this.policies.unshift(policy);
    this.activeTab = 1;   
    return result;
  }
}

