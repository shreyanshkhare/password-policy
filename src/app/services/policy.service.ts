import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {Policies} from '../shared/models/policy.model'
@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  constructor(private http: HttpClient) { }

  getPolicies(){
    //console.log("In service")
    const result = this.http.get("https://jsonplaceholder.typicode.com/todos");
    let arrPolicies = [ {
      id:1,
      name: 'Policy 1',
      lastUpdated: 'f/f3/Flag_of_Russia.svg',
      status: false,
    }];
    return result;
  }
}

