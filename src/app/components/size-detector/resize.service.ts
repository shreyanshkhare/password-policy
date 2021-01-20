import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import { SCREEN_SIZE } from "./screen-size.enum";

@Injectable({providedIn: 'root'})
export class ResizeService {

    // get onResize$(): Observable<SCREEN_SIZE> {
    //     return this.resizeSubject.asObservable().pipe(distinctUntilChanged());
    // }

    // private resizeSubject: Subject<SCREEN_SIZE>;

    // constructor() {
    //     this.resizeSubject = new Subject();
    // }

    resizeSubject = new BehaviorSubject('ls')

    onResize(size: SCREEN_SIZE) {
        this.resizeSubject.next(size);
    }
} 