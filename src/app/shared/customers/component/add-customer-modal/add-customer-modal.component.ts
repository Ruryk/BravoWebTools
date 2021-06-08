import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-add-customer-modal',
  templateUrl: './add-customer-modal.component.html',
  styleUrls: ['./add-customer-modal.component.scss']
})
export class AddCustomerModalComponent {
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
