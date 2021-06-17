import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICustomers } from '../../../../interfaces/interfaces';

@Component({
  selector: 'app-edit-customer-modal',
  templateUrl: './edit-customer-modal.component.html',
  styleUrls: ['./edit-customer-modal.component.scss']
})
export class EditCustomerModalComponent implements OnInit{
  public days: FormGroup;
  public data: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public dataRow: string,
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
  ngOnInit(): void {
    console.log(this.data);
  }
}
