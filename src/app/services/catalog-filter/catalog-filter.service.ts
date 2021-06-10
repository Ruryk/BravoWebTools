import { Injectable } from '@angular/core';
import { getCatalogDataSource, IState } from '../../reducers';
import { MatTableDataSource } from '@angular/material/table';
import { ICatalog, ICatalogState } from '../../interfaces/interfaces';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class CatalogFilterService{
  public displayedColumns: string[] = ['code', 'name', 'unit', 'price', 'availability', 'actions'];
  public availabilityList: string[] = ['In stock', 'Out of stock', 'Discontinued'];
  public filterValues: any = {
    customer: [],
    column: 'availability'
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
        if (column !== 'name') {
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
    this.dataSource.filter = JSON.stringify({ customer: [filterValue], column: 'name' });
  }

  availabilityFilter(filterValue: string[]): void {
    this.dataSource.filter = JSON.stringify({ customer: [...filterValue], column: 'availability' });
  }

}
