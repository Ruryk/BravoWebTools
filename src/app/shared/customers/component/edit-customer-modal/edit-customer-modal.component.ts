import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditCustomersAction } from '../../../../reducers/customers/customers.actions';
import { Store } from '@ngrx/store';
import { IState } from '../../../../reducers';

@Component({
  selector: 'app-edit-customer-modal',
  templateUrl: './edit-customer-modal.component.html',
  styleUrls: ['./edit-customer-modal.component.scss']
})
export class EditCustomerModalComponent implements OnInit {
  public data: any;
  public editCustomersGroup: FormGroup;
  public validation: boolean;

  constructor(
    private store: Store<IState>,
    @Inject(MAT_DIALOG_DATA) public dataRow: any,
    private fb: FormBuilder
  ) {
    this.validation = false;
    this.data = dataRow.dataRow;
    this.editCustomersGroup = fb.group({
      customerNo: new FormControl(this.data.customerNo, [Validators.required]),
      name: new FormControl({ value: this.data.name, disabled: true }, [Validators.required]),
      address: new FormControl({ value: this.data.address, disabled: true }, [Validators.required]),
      days: fb.group({
        Mon: new FormControl(this.data.days.Mon),
        Tue: new FormControl(this.data.days.Tue),
        Wed: new FormControl(this.data.days.Wed),
        Thu: new FormControl(this.data.days.Thu),
        Fri: new FormControl(this.data.days.Fri),
        Sat: new FormControl(this.data.days.Sat),
        Sun: new FormControl(this.data.days.Sun)
      }),
      contactName: new FormControl(this.data.contactName, [Validators.required]),
      contactPhone: new FormControl(this.data.contactPhone, [Validators.required]),
      notify: new FormControl(this.data.notify),
      productsCodes: new FormControl(this.data.productsCodes.join(', '), [Validators.required])
    });
  }

  ngOnInit(): void {
    localStorage.setItem('customerNo', this.data.customerNo);
  }

  editCustomers(): void {
    if (this.editCustomersGroup.valid) {
      const dataForm = {
        ...this.editCustomersGroup.value,
        address: this.data.address,
        name: this.data.name,
        productsCodes: this.data.productsCodes
      };
      this.store.dispatch(new EditCustomersAction({
        code: localStorage.getItem('customerNo') || '',
        newCode: this.editCustomersGroup.value.customerNo,
        data: dataForm
      }));
    } else {
      this.validation = true;
    }
    localStorage.removeItem('customerNo');
  }
}
