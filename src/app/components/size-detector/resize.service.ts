import { Injectable } from "@angular/core";
import { BehaviorSubject, fromEvent, Observable } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import { SCREEN_SIZE } from "./screen-size.enum";

@Injectable({providedIn: 'root'})
export class ResizeService {

    get onResize$(): Observable<SCREEN_SIZE> {
        return this.resizeSubject.asObservable().pipe(distinctUntilChanged());
    }

    private resizeSubject: BehaviorSubject<SCREEN_SIZE>;

    constructor() {
        this.resizeSubject = new BehaviorSubject(getBreakPoint());

        fromEvent(window, 'resize').subscribe(() => {
            this.resizeSubject.next(getBreakPoint())
        });
    }
}

function getBreakPoint() {
    let bp = SCREEN_SIZE.XS;
    const width = window.innerWidth
    if (width >= 576) {bp = SCREEN_SIZE.SM}
    if (width >= 768) {bp = SCREEN_SIZE.MD}
    if (width >= 992) {bp = SCREEN_SIZE.LG}
    if (width >= 1200) {bp = SCREEN_SIZE.XL}

    return bp;
}