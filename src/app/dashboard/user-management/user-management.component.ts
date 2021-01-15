import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MarkAsteriskDirective } from '../directives/mark-asterisk.directive';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  primaryEmail
  constructor() { }

  ngOnInit(): void {
  }
  get primEmail() {
    return this.userEmails.get('primaryEmail')
  }

  get secondEmail() {
    return this.userEmails.get('secondaryEmail')
  }

  
  userEmails = new FormGroup({
    primaryEmail: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    secondaryEmail: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [
      Validators.required,])
  });
}
