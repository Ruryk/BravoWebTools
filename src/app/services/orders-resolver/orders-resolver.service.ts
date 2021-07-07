import { Injectable, OnDestroy } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { getOrdersDataSourceForId, IState } from 'src/app/reducers';
import { IOrders } from 'src/app/interfaces/interfaces';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersResolverService implements Resolve<IOrders>, OnDestroy {
  public unsubscribe$: Subject<void>;

  constructor(
    private store: Store<IState>,
    private dataService: DataService
  ) {
    this.unsubscribe$ = new Subject<void>();
  }

  resolve(route: ActivatedRouteSnapshot): Observable<IOrders> {
    const id = route.paramMap.get('id')!.toString();
    return this.dataService.getOrdersById(id);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
