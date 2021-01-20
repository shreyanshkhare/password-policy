import { Component, ElementRef, HostListener } from '@angular/core';
import { ResizeService } from './resize.service';
import { SCREEN_SIZE } from './screen-size.enum';

@Component({
  selector: 'app-size-detector',
  template: `<div (window:resize)="onResize()">
              <div *ngFor="let s of sizes" class="{{s.css + ' ' + (prefix + s.id) }}">{{s.name}}</div>
            </div>`,
})

@HostListener('window:resize', ['$event'])

export class SizeDetectorComponent {
  prefix = 'is-';
  sizes = [
    {
      id: SCREEN_SIZE.XS, name: 'xs', css: `d-block d-sm-none`
    },
    {
      id: SCREEN_SIZE.SM, name: 'sm', css: `d-none d-sm-block d-md-none`
    },
    {
      id: SCREEN_SIZE.MD, name: 'md', css: `d-none d-md-block d-lg-none`
    },
    {
      id: SCREEN_SIZE.LG, name: 'lg', css: `d-none d-lg-block d-xl-none`
    },
    {
      id: SCREEN_SIZE.XL, name: 'xl', css: `d-none d-xl-block`
    },
  ];

  constructor(private elementRef: ElementRef, private resizeService: ResizeService) { }

  onResize() {
    this.detectScreenSize();
  }

  ngAfterViewInit() {
    this.detectScreenSize();
  }

  private detectScreenSize() {
    const currentSize = this.sizes.find(x => {
      const el = this.elementRef.nativeElement.querySelector(`.${this.prefix}${x.id}`);
      const isVisible = window.getComputedStyle(el).display != 'none';

      return isVisible;
    });

    this.resizeService.onResize(currentSize.id);
  }
}
