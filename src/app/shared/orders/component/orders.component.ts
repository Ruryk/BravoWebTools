import { AfterViewInit, Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { SidenavService } from 'src/app/services/sidenav/sidenav.service';
import { SelectFilterMenuComponent } from '../../custom-ui/select-filter-menu/select-filter-menu.component';
import { MatMenuPanel, MatMenuTrigger } from '@angular/material/menu';

export interface TableElement {
  dropdown: string;
  order: string;
  customer: string;
  customerNo: string;
  items: number;
  notes: string;
  ordered: string;
  delivery: string;
  status: boolean;
  position: string;
}

export interface TableElementItem {
  code: string;
  product: string;
  unit: string;
  quantity: number;
}

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
  public displayedColumns: string[] = ['dropdown', 'order', 'customer', 'customerNo', 'items', 'notes', 'ordered', 'delivery', 'status'];
  public displayedColumnsItem: string[] = ['code', 'product', 'unit', 'quantity'];
  public dataSource = new MatTableDataSource(ELEMENT_DATA);
  public dataSourceItem = new MatTableDataSource(ELEMENT_DATA_ITEM);
  public expandedElement: TableElement | null;

  @ViewChild('customersInput') customersInput?: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete?: MatAutocomplete;
  @ViewChild('chipList') chipList?: MatChipList;

  constructor(private sidenavService: SidenavService) {
    this.paginator = null;
    this.sort = null;
    this.sideMenuStatus = true;
    this.expandedElement = null;
  }

  ngOnInit(): void {
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

}

const ELEMENT_DATA: TableElement[] = [
  {
    dropdown: 'chevron-down',
    order: '35322',
    customer: 'Burger Bar',
    customerNo: 'BB-243',
    items: 12,
    notes: 'Please deliver...',
    ordered: 'Yesterday, 22:01',
    delivery: 'Today',
    status: false,
    position: 'Burger Bar'
  },
  {
    dropdown: 'chevron-down',
    order: '32342',
    customer: 'Gyoza SS',
    customerNo: 'GZ-889',
    items: 75,
    notes: 'Confirmed',
    ordered: 'Yesterday, 22:01',
    delivery: 'Tomorrow',
    status: true,
    position: 'Gyoza SS'
  },
  {
    dropdown: 'chevron-down',
    order: '23424',
    customer: 'Burger Bar',
    customerNo: 'BB-243',
    items: 9,
    notes: '+1 Bottle Coc...',
    ordered: 'Mon, 15 Jun 2021, 22:01',
    delivery: 'Mon, 15 Jun 2021',
    status: true,
    position: 'Burger Bar'
  }
];

const ELEMENT_DATA_ITEM: TableElementItem[] = [
  { code: 'APP123', product: 'Apples', unit: 'kg', quantity: 14 },
  { code: 'TOM53', product: 'Tomatos', unit: 'box', quantity: 4 },
  { code: 'CUC997', product: 'Cucumber', unit: 'pcs', quantity: 36 },
];
