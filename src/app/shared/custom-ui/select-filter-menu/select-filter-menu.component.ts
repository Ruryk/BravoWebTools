import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { map, startWith } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatMenuTrigger, MatMenuPanel } from '@angular/material/menu';

@Component({
  selector: 'app-select-filter-menu',
  templateUrl: './select-filter-menu.component.html',
  styleUrls: ['./select-filter-menu.component.scss']
})
export class SelectFilterMenuComponent implements OnInit {

  @Input() public dataSource!: MatTableDataSource<any>;
  @ViewChild(MatMenuTrigger) trigger?: MatMenuTrigger;
  @ViewChild('menuCustomersFilter') menu?: MatMenuPanel;

// sorting customers
  public visible = true;
  public selectable = true;
  public removable = true;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public customersCtrl = new FormControl();
  public filteredCustomers: Observable<string[]>;
  public customers: string[] = [];
  public customersChange$ = new Subject<string[]>();
  public allCustomers: string[] = ['Gyoza SS', 'Burger King', 'Burger Bar'];

  @ViewChild('customersInput') customersInput?: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete?: MatAutocomplete;
  @ViewChild('chipList') chipList?: MatChipList;

  constructor() {
    // sorting select list customers
    this.filteredCustomers = this.customersCtrl.valueChanges.pipe(
      startWith(null),
      map((customer: string | null) => customer ? this._filter(customer) : this.allCustomers.slice()));
  }

  // none value
  filterValues: any = {
    customer: [],
    column: 'customer'
  };

  ngOnInit(): void {
    this.getFormsValue();
  }

  // create filter
  getFormsValue(): void {
    this.dataSource.filterPredicate = (data, filter: string): boolean => {
      const searchString = JSON.parse(filter);
      const column = searchString.column;
      let isPositionAvailable = false;
      if (searchString.customer.length) {
        if (column !== 'delivery') {
          for (const d of searchString.customer) {
            if (data[column].trim() === d) {
              isPositionAvailable = true;
            }
          }
        } else {
          if (searchString.customer.length === 2) {
            isPositionAvailable = (data[column] >= searchString.customer[0] && data[column] <= searchString.customer[1]) ? true : false;
          } else {
            isPositionAvailable = (data[column] >= searchString.customer[0]) ? true : false;
          }
        }
      } else {
        isPositionAvailable = true;
      }
      return isPositionAvailable;

    };
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  filterCustomers(): void {
    this.filterValues['customer'] = this.customers;
    this.filterValues['column'] = 'customer';
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our customer
    if (value) {
      this.customers.push(value);
      this.customersChange$.next(this.customers);
    }
    // Clear the input value
    event.input.value = '';
    this.customersCtrl.setValue(null);
    this.filterCustomers();
  }

  remove(customer: string): void {
    const index = this.customers.indexOf(customer);
    if (index >= 0) {
      this.customers.splice(index, 1);
    }
    this.filterCustomers();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.customers.push(event.option.viewValue);
    this.customersInput!.nativeElement.value = '';
    this.customersCtrl.setValue(null);
    this.filterCustomers();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allCustomers.filter(customer => customer.toLowerCase().indexOf(filterValue) === 0);
  }

}
