import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';

import { getCatalogDataSource, IState } from 'src/app/reducers';
import { ICatalog } from 'src/app/interfaces/interfaces';
import { BehaviorSubject, combineLatest} from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CatalogFilterService {
  public availabilityFilterValue: BehaviorSubject<string[] | null>;
  public productFilterValue: BehaviorSubject<string | null>;
  public dataCatalog = this.store.select(getCatalogDataSource);
  public dataSource: MatTableDataSource<ICatalog>;

  constructor(private store: Store<IState>) {
    this.dataSource = new MatTableDataSource<ICatalog>();
    this.availabilityFilterValue = new BehaviorSubject<string[] | null>(null);
    this.productFilterValue = new BehaviorSubject<string | null>(null);
    this.setDataSourceFiltering();
  }

  setDataSourceFiltering(): void {
    combineLatest([this.availabilityFilterValue, this.productFilterValue]).pipe(
      switchMap(([availabilityFilterSubject, productFilterSubject]) => this.dataCatalog.pipe(
        map((data: any): any => {
          return Object.values(data).filter((obj: any): any => {
            let isAvailability = true;
            let isSearchString = true;
            if (availabilityFilterSubject) {
              isAvailability = this.setAvailabilityFiltration(availabilityFilterSubject, obj);
            }
            if (productFilterSubject) {
              isSearchString = this.setSearchStringFiltration(productFilterSubject, obj);
            }
            return isAvailability && isSearchString;
          });
        })
      )),
    ).subscribe(data => this.dataSource.data = data);
  }

  setAvailabilityFiltration(availabilityFilterSubject: string[], obj: ICatalog): boolean {
    return availabilityFilterSubject?.some((item) => item === obj.availability);
  }

  setSearchStringFiltration(productFilterSubject: string, obj: ICatalog): boolean {
    return obj.code.toLowerCase().includes(productFilterSubject) ||
      obj.name.toLowerCase().includes(productFilterSubject);
  }
}
