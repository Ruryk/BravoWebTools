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
  IOrdersState,
  OrdersTableElement,
  OrdersTableElementItem
} from 'src/app/interfaces/interfaces';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { getOrdersDataSource, IState } from '../../../reducers';
import { Store } from '@ngrx/store';

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
  public displayedColumns: string[] = ['dropdown', 'orderNo', 'customer', 'customerNo', 'items', 'notes', 'ordered', 'delivery', 'status'];
  public displayedColumnsItem: string[] = ['productCode', 'productName', 'unit', 'quantity'];
  public expandedElement: OrdersTableElement | null;

  public dataOrders = this.store.select(getOrdersDataSource);
  public dataSource: MatTableDataSource<IOrders>;
  public dataSourceItem: MatTableDataSource<OrdersTableElementItem>;

  @ViewChild('customersInput') customersInput?: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete?: MatAutocomplete;
  @ViewChild('chipList') chipList?: MatChipList;

  public dateRange: FormGroup;

  constructor(
    private store: Store<IState>,
    private sidenavService: SidenavService
  ) {
    this.paginator = null;
    this.sort = null;
    this.sideMenuStatus = true;
    this.expandedElement = null;

    this.dateRange = new FormGroup({
      start: new FormControl(''),
      end: new FormControl('')
    });

    this.dataSource = new MatTableDataSource<IOrders>();
    this.dataSourceItem = new MatTableDataSource<OrdersTableElementItem>();
    this.dataOrders.subscribe((data: IOrdersState) => this.dataSource.data = Object.values(data));
    this.dataSourceItem = this.dataSource.data.reduce((acc: any, item: IOrders) => {
      const data = {
        productCode: item.product?.productCode,
        productName: item.product?.productName,
        unit: item.product?.unit,
        quantity: item.product?.quantity
      };
      acc.push(data);
      return acc;
    }, [] as any);
  }

  public status: any = [
    { value: '', viewValue: 'All' },
    { value: 'confirm', viewValue: 'Confirm' },
    { value: 'confirmed', viewValue: 'Confirmed' }
  ];

  ngOnInit(): void {
    this.dateRange.valueChanges.subscribe(date => {
      this.dateFilter(date);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onSideNavToggle(): void {
    this.sideMenuStatus = !this.sideMenuStatus;
    this.sidenavService.sideNavState$.next(this.sideMenuStatus);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  statusFilter(value: string): void {
    if (value === '') {
      this.dataSource.filter = JSON.stringify({ customer: [] });

    } else {
      this.dataSource.filter = JSON.stringify({ customer: [value], column: 'status' });
    }
  }

  dateFilter(event: MatDatepickerInputEvent<Date>): void {
    const startKey = 'start';
    const endKey = 'end';
    const startDate = new Date(this.dateRange.controls[startKey].value).getTime();
    const endDate = new Date(this.dateRange.controls[endKey].value).getTime();
    if (!isNaN(endDate)) {
      this.dataSource.filter = JSON.stringify({ customer: [startDate, endDate + 100000], column: 'delivery' });
    } else {
      this.dataSource.filter = JSON.stringify({ customer: [startDate], column: 'delivery' });
    }
  }
}

const ELEMENT_DATA: OrdersTableElement[] = [];

const ELEMENT_DATA_ITEM: OrdersTableElementItem[] = [];
