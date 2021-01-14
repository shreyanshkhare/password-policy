import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-policy',
  templateUrl: './add-policy.component.html',
  styleUrls: ['./add-policy.component.css']
})
export class AddPolicyComponent implements OnInit {
  
  addPolicyForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("Form Submitted");
  }

}
