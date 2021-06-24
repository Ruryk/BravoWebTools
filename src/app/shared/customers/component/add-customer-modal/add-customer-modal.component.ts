import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { getCatalogDataSource, IState } from '../../../../reducers';
import { AddNewCustomersAction } from '../../../../reducers/customers/customers.actions';


@Component({
  selector: 'app-add-customer-modal',
  templateUrl: './add-customer-modal.component.html',
  styleUrls: ['./add-customer-modal.component.scss']
})
export class AddCustomerModalComponent implements OnInit {
  public catalogDataSource: string[];
  public addCustomerGroup: FormGroup;
  public nameControl = new FormControl();
  public options: string[] = ['Burger King', 'Burger Bar', 'Gyoza SS'];
  public filteredOptions: Observable<string[]>;
  public validation: boolean;
  public invalid: boolean;
  public unsubscribe$: Subject<void>;
  public productsNoneCodes: string[];

  constructor(
    private fb: FormBuilder,
    private store: Store<IState>
  ) {
    this.productsNoneCodes = [];
    this.unsubscribe$ = new Subject<void>();
    this.catalogDataSource = [];
    this.invalid = false;
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
      productsCodes: new FormControl('APP123, CUC997, TOM53', [Validators.required])
    });
    this.filteredOptions = new Observable<string[]>();
    this.store.select(getCatalogDataSource)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => this.catalogDataSource = Object.keys(data));
  }

  ngOnInit(): void {
    this.filteredOptions = this.nameControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.addCustomerGroup.controls.productsCodes.valueChanges
      .subscribe(value => {
        const status = value.split(', ').filter((item: string) => !this.catalogDataSource.includes(item));
        if (status.length > 0) {
          this.invalid = true;
          this.productsNoneCodes = status;
        } else {
          this.invalid = false;
        }
      });
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
