import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';

import { getCatalogDataSource, IState } from 'src/app/reducers';
import { ICatalog, ICatalogData,  IFilterValues } from 'src/app/interfaces/interfaces';
import { ECatalogColumn } from 'src/app/enums/enums';

@Injectable({
  providedIn: 'root'
})
export class CatalogFilterService {
  public filterValues: IFilterValues = {
    customer: [],
    column: ECatalogColumn.Availability
  };
  public dataCatalog = this.store.select(getCatalogDataSource);
  public dataSource: MatTableDataSource<ICatalog>;

  constructor(private store: Store<IState>) {
    this.dataSource = new MatTableDataSource<ICatalog>();
    this.dataCatalog.subscribe((data: ICatalogData) => {
      this.dataSource.data = Object.values(data);
    });
    this.setDataSourceFiltering();
  }

  setDataSourceFiltering(): void {
    this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
      const searchString = JSON.parse(filter);
      const column = searchString.column;
      if (searchString.customer.length) {
        switch (column) {
          case ECatalogColumn.Name:
            return this.setCatalogNameFilter(data, column, searchString);
          default:
            return this.setDefaultFilter(data, column, searchString);
        }
      }
      return true;
    };
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  setCatalogNameFilter(data: any, column: string, searchString: any): boolean {
    return data[column]
      .trim()
      .toLowerCase()
      .includes(searchString.customer[0].toLowerCase());
  }

  setDefaultFilter(data: any, column: string, searchString: any): boolean {
    return Object.values(searchString.customer)
      .some((value: any) => value.toLowerCase() === data[column].trim().toLowerCase());
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = JSON.stringify({ customer: [filterValue], column: ECatalogColumn.Name });
  }

  setAvailabilityFilter(filterValue: string[]): void {
    this.dataSource.filter = JSON.stringify({ customer: [...filterValue], column: ECatalogColumn.Availability });
  }
}
