import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-policy',
  templateUrl: './view-policy.component.html',
  styleUrls: ['./view-policy.component.css']
})
export class ViewPolicyComponent implements OnInit {
  public date: Date = new Date();
  constructor() { }

  ngOnInit(): void {
  }

}
