import { HttpClient, HttpRequest} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
// import { BehaviorSubject, Observable, Subject, throwError } from "rxjs";
import { map } from "rxjs/operators";


@Injectable({providedIn: 'root'})
export class UserDetailService {


    constructor(private router: Router, private http: HttpClient) {}


    
    getUserDetails(){

        return this.http.get<any>('/api/user/me').pipe(map((res:any)=>res))
    }
}