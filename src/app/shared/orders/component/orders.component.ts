import { AfterViewInit, Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipList } from '@angular/material/chips';

import { SidenavService } from 'src/app/services/sidenav/sidenav.service';
import { OrdersFilterService } from 'src/app/services/orders-filter/orders-filter.service';
import {  IOrders, IStatus, OrdersTableElement } from 'src/app/interfaces/interfaces';
import { EAnimation } from 'src/app/enums/enums';
import { CDisplayedOrdersColumns, CDisplayedOrdersColumnsItems } from 'src/app/constantes/constantes';
import { IState } from 'src/app/reducers';
import { ConfirmOrdersAction } from 'src/app/reducers/orders/orders.actions';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  animations: [
    trigger(EAnimation.DetailExpand, [
      state(EAnimation.Collapsed, style({ height: '0px', minHeight: '0' })),
      state(EAnimation.Expanded, style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrdersComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort | null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null;
  @ViewChild('customersInput') customersInput?: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete?: MatAutocomplete;
  @ViewChild('chipList') chipList?: MatChipList;

  public sideMenuStatus: boolean;
  public displayedColumns: string[] = CDisplayedOrdersColumns;
  public displayedColumnsItem: string[] = CDisplayedOrdersColumnsItems;
  public expandedElement: OrdersTableElement | null;
  public dataSource: MatTableDataSource<IOrders>;
  public dateRange: FormGroup;
  public status: IStatus[];
  public unsubscribe$: Subject<void>;

  constructor(
    private dataOrdersFilterService: OrdersFilterService,
    private store: Store<IState>,
    private sidenavService: SidenavService
  ) {
    this.unsubscribe$ = new Subject<void>();
    this.paginator = null;
    this.sort = null;
    this.sideMenuStatus = true;
    this.expandedElement = this.dataOrdersFilterService.expandedElement;

    this.dateRange = new FormGroup({
      start: new FormControl(''),
      end: new FormControl('')
    });

    this.status = this.dataOrdersFilterService.status;
    this.dataSource = this.dataOrdersFilterService.dataSource;
  }

  ngOnInit(): void {
    this.dateRange.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(date => {
      this.setDateFilter();
    });
  }

  ngAfterViewInit(): void {
    this.dataOrdersFilterService.dataSource.paginator = this.paginator;
    this.dataOrdersFilterService.dataSource.sort = this.sort;
  }

  onSideNavToggle(): void {
    this.sideMenuStatus = !this.sideMenuStatus;
    this.sidenavService.sideNavState$.next(this.sideMenuStatus);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataOrdersFilterService.applyFilter(filterValue);
  }

  setStatusFilter(value: string): void {
    this.dataOrdersFilterService.setStatusFilter(value);
  }

  setDateFilter(): void {
    const startKey = 'start';
    const endKey = 'end';
    const startDate = new Date(this.dateRange.controls[startKey].value).getTime();
    const endDate = new Date(this.dateRange.controls[endKey].value).getTime();
    this.dataOrdersFilterService.setDateFilter(startDate, endDate);
  }

  confirmOrder(order: string): void {
    this.store.dispatch(new ConfirmOrdersAction({ code: order }));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
