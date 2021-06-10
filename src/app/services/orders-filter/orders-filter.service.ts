import { Injectable } from '@angular/core';
import { IOrders, IOrdersState, OrdersTableElement, OrdersTableElementItem } from '../../interfaces/interfaces';
import { getOrdersDataSource, IState } from '../../reducers';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Injectable({
  providedIn: 'root'
})
export class OrdersFilterService {
  public displayedColumns: string[] = ['dropdown', 'orderNo', 'customer', 'customerNo', 'items', 'notes', 'ordered', 'delivery', 'status'];
  public displayedColumnsItem: string[] = ['productCode', 'productName', 'unit', 'quantity'];
  public expandedElement: OrdersTableElement | null;
  public dataOrders = this.store.select(getOrdersDataSource);
  public dataSource: MatTableDataSource<IOrders>;
  public dataSourceItem: MatTableDataSource<OrdersTableElementItem>;
  public status: any = [
    { value: '', viewValue: 'All' },
    { value: 'confirm', viewValue: 'Confirm' },
    { value: 'confirmed', viewValue: 'Confirmed' }
  ];
  constructor(private store: Store<IState>) {
    this.expandedElement = null;
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

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  statusFilter(value: string): void {
    if (value === '') {
      this.dataSource.filter = JSON.stringify({ customer: [] });

    } else {
      this.dataSource.filter = JSON.stringify({ customer: [value], column: 'status' });
    }
  }

  dateFilter(startDate: number, endDate: number): void {
    if (!isNaN(endDate)) {
      this.dataSource.filter = JSON.stringify({ customer: [startDate, endDate + 100000], column: 'delivery' });
    } else {
      this.dataSource.filter = JSON.stringify({ customer: [startDate], column: 'delivery' });
    }
  }
}
