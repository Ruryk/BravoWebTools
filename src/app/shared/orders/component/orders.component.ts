import { AfterViewInit, Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipList } from '@angular/material/chips';

import { SidenavService } from 'src/app/services/sidenav/sidenav.service';
import { OrdersTableElement, OrdersTableElementItem } from 'src/app/interfaces/interfaces';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

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
  public expandedElement: OrdersTableElement | null;

  @ViewChild('customersInput') customersInput?: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete?: MatAutocomplete;
  @ViewChild('chipList') chipList?: MatChipList;

  public dateRange: FormGroup;

  constructor(private sidenavService: SidenavService) {
    this.paginator = null;
    this.sort = null;
    this.sideMenuStatus = true;
    this.expandedElement = null;

    this.dateRange = new FormGroup({
      start: new FormControl(''),
      end: new FormControl('')
    });
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
    const startDate = new Date(this.dateRange.controls['start'].value).getTime();
    const endDate = new Date(this.dateRange.controls['end'].value).getTime();
    if (!isNaN(endDate)) {
      this.dataSource.filter = JSON.stringify({ customer: [startDate, endDate + 100000], column: 'delivery' });
    } else {
      this.dataSource.filter = JSON.stringify({ customer: [startDate], column: 'delivery' });
    }
  }
}

const ELEMENT_DATA: OrdersTableElement[] = [
  {
    dropdown: 'chevron-down',
    order: '35322',
    customer: 'Burger Bar',
    customerNo: 'BB-243',
    items: 12,
    notes: 'Please deliver...',
    ordered: 1623045600000,
    delivery: 1623045600000,
    status: 'confirm'
  },
  {
    dropdown: 'chevron-down',
    order: '32342',
    customer: 'Gyoza SS',
    customerNo: 'GZ-889',
    items: 75,
    notes: 'Confirmed',
    ordered: 1623132000000,
    delivery: 1623132000000,
    status: 'confirmed'
  },
  {
    dropdown: 'chevron-down',
    order: '23424',
    customer: 'Burger Bar',
    customerNo: 'BB-243',
    items: 9,
    notes: '+1 Bottle Coc...',
    ordered: 1623218400000,
    delivery: 1623218400000,
    status: 'confirmed'
  }
];

const ELEMENT_DATA_ITEM: OrdersTableElementItem[] = [
  { code: 'APP123', product: 'Apples', unit: 'kg', quantity: 14 },
  { code: 'TOM53', product: 'Tomatos', unit: 'box', quantity: 4 },
  { code: 'CUC997', product: 'Cucumber', unit: 'pcs', quantity: 36 },
];
