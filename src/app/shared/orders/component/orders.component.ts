import { AfterViewInit, Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipList } from '@angular/material/chips';

import { SidenavService } from 'src/app/services/sidenav/sidenav.service';
import {
  IOrders,
  OrdersTableElement
} from 'src/app/interfaces/interfaces';
import { FormControl, FormGroup } from '@angular/forms';
import { OrdersFilterService } from '../../../services/orders-filter/orders-filter.service';
import { Store } from '@ngrx/store';
import { IState } from '../../../reducers';
import { ConfirmOrdersAction } from '../../../reducers/orders/orders.actions';
import { MatMenu, MatMenuPanel } from '@angular/material/menu';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrdersComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort: MatSort | null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null;

  public sideMenuStatus: boolean;
  public displayedColumns: string[];
  public displayedColumnsItem: string[];
  public expandedElement: OrdersTableElement | null;
  public dataSource: MatTableDataSource<IOrders>;

  @ViewChild('customersInput') customersInput?: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete?: MatAutocomplete;
  @ViewChild('chipList') chipList?: MatChipList;

  public dateRange: FormGroup;
  public status: any;

  constructor(
    private dataFilter: OrdersFilterService,
    private store: Store<IState>,
    private sidenavService: SidenavService
  ) {
    this.paginator = null;
    this.sort = null;
    this.sideMenuStatus = true;
    this.expandedElement = this.dataFilter.expandedElement;

    this.dateRange = new FormGroup({
      start: new FormControl(''),
      end: new FormControl('')
    });

    this.displayedColumns = this.dataFilter.displayedColumns;
    this.displayedColumnsItem = this.dataFilter.displayedColumnsItem;
    this.status = this.dataFilter.status;
    this.dataSource = this.dataFilter.dataSource;
  }


  ngOnInit(): void {
    this.dateRange.valueChanges.subscribe(date => {
      this.dateFilter();
    });
  }

  ngAfterViewInit(): void {
    this.dataFilter.dataSource.paginator = this.paginator;
    this.dataFilter.dataSource.sort = this.sort;
  }

  onSideNavToggle(): void {
    this.sideMenuStatus = !this.sideMenuStatus;
    this.sidenavService.sideNavState$.next(this.sideMenuStatus);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataFilter.applyFilter(filterValue);
  }

  statusFilter(value: string): void {
    this.dataFilter.statusFilter(value);
  }

  dateFilter(): void {
    const startKey = 'start';
    const endKey = 'end';
    const startDate = new Date(this.dateRange.controls[startKey].value).getTime();
    const endDate = new Date(this.dateRange.controls[endKey].value).getTime();
    this.dataFilter.dateFilter(startDate, endDate);
  }

  confirmOrder(order: string): void {
    this.store.dispatch(new ConfirmOrdersAction({code: order}));
  }

  printOrders(order: string): void{

  }
}
