import { Router } from '@angular/router';
import { Injectable,ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable,of } from "rxjs";
import {Policies} from '../shared/models/policy.model'

import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PolicyService {
 
  constructor(private http: HttpClient, private router: Router) { }
  
   getPolicies():Observable<Policies[]> {
   
    const result = this.http.get<Policies[]>('/api/password_policy/');
  
    //return this.policies;
    return result
  }
  addPolicy(policy):Observable<Policies[]>{
    const result = this.http.post<Policies[]>('/api/password_policy/', policy)   
   //this.router.navigate(['/dashboard/password-policies']);
   this.router.navigate(['/dashboard'], {fragment:'password-policies'})
    return result;
  }

  changePassword(obj){
    
   // const result  = this.http.patch('/api/change-password/', obj)

    const result = this.http.patch('/api/change-password/', obj).pipe(
      map((res: any) => {
        if (!res.response) {
          throw new Error('Value expected!');
        }
        return res;
      }),
      catchError(err => of([err.error]))
    );

    return result;
  }

 
  deletePolicy(id: number): Observable<Policies[]> {
    return this.http.delete<Policies[]>('/api/password_policy/'+id+'/');
  }

  editPolicy(policy){
    const result = this.http.patch('/api/password_policy',policy);
    return result;
  }
  updatePolicy(policy){
    const result = this.http.patch('/api/password_policy/'+policy.id+'/',policy);
    return result;
  }

}

