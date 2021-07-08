import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';

import { getCustomersDataSource, IState } from 'src/app/reducers';
import { ICustomers } from 'src/app/interfaces/interfaces';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomersFilterService {
  public searchStringFilterValue: BehaviorSubject<string | null>;
  public dataCustomers = this.store.select(getCustomersDataSource);
  public dataSource: MatTableDataSource<ICustomers>;

  constructor(private store: Store<IState>) {
    this.dataSource = new MatTableDataSource<ICustomers>();
    this.searchStringFilterValue = new BehaviorSubject<string | null>(null);
    this.setDataSourceFiltering();
  }

  setDataSourceFiltering(): void {
    combineLatest([this.searchStringFilterValue]).pipe(
      switchMap(([searchStringFilterSubject]) => this.dataCustomers.pipe(
        map((data: any): any => {
          return Object.values(data).filter((customer: any): any => {
            let isSearchString = true;
            if (searchStringFilterSubject) {
              isSearchString = this.setSearchStringFiltration(searchStringFilterSubject, customer);
            }
            return isSearchString;
          });
        })
      )),
    ).subscribe(data => this.dataSource.data = data);
  }

  setSearchStringFiltration(searchStringFilterSubject: string, customer: ICustomers): boolean {
    return customer.customerNo.toLowerCase().includes(searchStringFilterSubject) ||
      customer.name.toLowerCase().includes(searchStringFilterSubject) ||
      customer.address.toLowerCase().includes(searchStringFilterSubject);
  }
}
