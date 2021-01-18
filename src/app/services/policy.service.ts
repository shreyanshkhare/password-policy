import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {Policies} from '../shared/models/policy.model'
@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  constructor(private http: HttpClient) { }
  //constructor() { }


    getPolicies(): Observable<Policies[]> {
    //console.log("In service")
    const result = this.http.get<Policies[]>("https://jsonplaceholder.typicode.com/todos");
   
    return result;
  }
}

