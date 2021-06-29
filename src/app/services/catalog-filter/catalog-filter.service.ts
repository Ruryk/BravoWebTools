import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';

import { getCatalogDataSource, IState } from 'src/app/reducers';
import { ICatalog, ICatalogState, IFilterValues } from 'src/app/interfaces/interfaces';
import { ECatalogColumn } from 'src/app/enums/enums';

@Injectable({
  providedIn: 'root'
})
export class CatalogFilterService{
  public filterValues: IFilterValues = {
    customer: [],
    column: ECatalogColumn.Availability
  };
  public dataCatalog = this.store.select(getCatalogDataSource);
  public dataSource: MatTableDataSource<ICatalog>;

  constructor(private store: Store<IState>) {
    this.dataSource = new MatTableDataSource<ICatalog>();
    this.dataCatalog.subscribe((data: ICatalogState) => {
      this.dataSource.data = Object.values(data);
    });
    this.setDataSourceFiltering();
  }

  setDataSourceFiltering(): void {
    this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
      const searchString = JSON.parse(filter);
      const column = searchString.column;
      let isPositionAvailable = false;
      if (searchString.customer.length) {
        if (column !== ECatalogColumn.Name) {
          for (const d of searchString.customer) {
            if (data[column].trim().toLowerCase() === d.toLowerCase()) {
              isPositionAvailable = true;
            }
          }
        }else{
          if (data[column].trim().toLowerCase().includes(searchString.customer[0].toLowerCase())) {
            isPositionAvailable = true;
          }
        }
      } else {
        isPositionAvailable = true;
      }
      return isPositionAvailable;
    };
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  applyFilter(filterValue: string): void{
    this.dataSource.filter = JSON.stringify({ customer: [filterValue], column: ECatalogColumn.Name });
  }

  setAvailabilityFilter(filterValue: string[]): void {
    this.dataSource.filter = JSON.stringify({ customer: [...filterValue], column: ECatalogColumn.Availability });
  }

}
