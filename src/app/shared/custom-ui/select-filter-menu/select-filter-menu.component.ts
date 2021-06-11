import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { map, startWith } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatMenuTrigger, MatMenuPanel } from '@angular/material/menu';

import { OrdersFilterService } from '../../../services/orders-filter/orders-filter.service';

@Component({
  selector: 'app-select-filter-menu',
  templateUrl: './select-filter-menu.component.html',
  styleUrls: ['./select-filter-menu.component.scss']
})
export class SelectFilterMenuComponent implements OnInit {

  @ViewChild(MatMenuTrigger) trigger?: MatMenuTrigger;
  @ViewChild('menuCustomersFilter') menu?: MatMenuPanel;
  @ViewChild('customersInput') customersInput?: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete?: MatAutocomplete;
  @ViewChild('chipList') chipList?: MatChipList;

  public dataSource: MatTableDataSource<any>;
  public visible = true;
  public selectable = true;
  public removable = true;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public customersCtrl = new FormControl();
  public filteredCustomers: Observable<string[]>;
  public customers: string[] = [];
  public customersChange$ = new Subject<string[]>();
  public allCustomers: string[] = ['Gyoza SS', 'Burger King', 'Burger Bar'];
  public filterValues: any;

  constructor(private dataFilter: OrdersFilterService) {
    this.dataSource = this.dataFilter.dataSource;
    this.filterValues = this.dataFilter.filterValues;
    this.filteredCustomers = this.customersCtrl.valueChanges.pipe(
      startWith(null),
      map((customer: string | null) => customer ? this._filter(customer) : this.allCustomers.slice()));
  }

  ngOnInit(): void {
  }

  filterCustomers(): void {
    const customerKey = 'customer';
    const columnKey = 'column';
    this.filterValues[customerKey] = this.customers;
    this.filterValues[columnKey] = 'customer';
    this.dataFilter.dataSource.filter = JSON.stringify(this.filterValues);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.customers.push(value);
      this.customersChange$.next(this.customers);
    }
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
