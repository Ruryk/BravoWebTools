import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-customer-modal',
  templateUrl: './edit-customer-modal.component.html',
  styleUrls: ['./edit-customer-modal.component.scss']
})
export class EditCustomerModalComponent {
  public days: FormGroup;

  constructor(

    private fb: FormBuilder
  ) {
    this.days = fb.group({
      Mon: true,
      Tue: false,
      Wed: true,
      Thu: false,
      Fri: true,
      Sat: false,
      Sun: false
    });
  }
}
