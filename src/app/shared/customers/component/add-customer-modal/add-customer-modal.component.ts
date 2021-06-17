import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IState } from '../../../../reducers';
import { AddNewCustomersAction } from '../../../../reducers/customers/customers.actions';


@Component({
  selector: 'app-add-customer-modal',
  templateUrl: './add-customer-modal.component.html',
  styleUrls: ['./add-customer-modal.component.scss']
})
export class AddCustomerModalComponent implements OnInit {
  public addCustomerGroup: FormGroup;
  public nameControl = new FormControl();
  public options: string[] = ['Burger King', 'Burger Bar', 'Gyoza SS'];
  public filteredOptions: Observable<string[]>;
  public validation: boolean;

  constructor(
    private fb: FormBuilder,
    private store: Store<IState>
  ) {
    this.validation = false;
    this.addCustomerGroup = fb.group({
      customerNo: new FormControl('BB-135', [Validators.required]),
      name: new FormControl('Burger Bar', [Validators.required]),
      address: new FormControl('Second Street 3421 Geneva', [Validators.required]),
      days: fb.group({
        Mon: new FormControl(false),
        Tue: new FormControl(false),
        Wed: new FormControl(false),
        Thu: new FormControl(false),
        Fri: new FormControl(false),
        Sat: new FormControl(false),
        Sun: new FormControl(false)
      }),
      contactName: new FormControl('Sam Smith', [Validators.required]),
      contactPhone: new FormControl('0630000000', [Validators.required]),
      notify: new FormControl(false),
      productsCodes: new FormControl('B-3535, A-3721, BB-135', [Validators.required])
    });
    this.filteredOptions = new Observable<string[]>();
  }

  ngOnInit(): void {
    this.filteredOptions = this.nameControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  addCustomer(): void {
    if (this.addCustomerGroup.valid) {
      const dataForm = {
        ...this.addCustomerGroup.value,
        productsCodes: this.addCustomerGroup.value.productsCodes.split(',').map((el: string) => el.trim())
      };
      this.store.dispatch(new AddNewCustomersAction({
        code: this.addCustomerGroup.get('customerNo')?.value,
        data: dataForm
      }));
    } else {
      this.validation = true;
    }
  }
}
