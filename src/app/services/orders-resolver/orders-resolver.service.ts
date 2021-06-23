import { Injectable, OnDestroy } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { getOrdersDataSourceForId, IState } from '../../reducers';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IOrders } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrdersResolverService implements Resolve<IOrders>, OnDestroy {
  public unsubscribe$: Subject<void>;

  constructor(
    private store: Store<IState>
  ) {
    this.unsubscribe$ = new Subject<void>();
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<object>{
    const id = route.paramMap.get('id')!.toString();
    let data = {};
    await this.store.select(getOrdersDataSourceForId, { id })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => data = res);
    return { data };
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
