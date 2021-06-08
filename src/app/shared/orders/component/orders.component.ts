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
// sorting customers
  public visible = true;
  public selectable = true;
  public removable = true;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public customersCtrl = new FormControl();
  public filteredCustomers: Observable<string[]>;
  public customers: string[] = [];
  public customersChange$ = new Subject<string[]>();
  public allCustomers: string[] = ['Gyoza SS', 'Burger King', 'Burger Bar'];

  @ViewChild('customersInput') customersInput?: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete?: MatAutocomplete;
  @ViewChild('chipList') chipList?: MatChipList;

  constructor(private sidenavService: SidenavService) {
    this.paginator = null;
    this.sort = null;
    this.sideMenuStatus = true;
    this.expandedElement = null;

// sorting select list customers
    this.filteredCustomers = this.customersCtrl.valueChanges.pipe(
      startWith(null),
      map((customer: string | null) => customer ? this._filter(customer) : this.allCustomers.slice()));
  }


  // none value
  filterValues: any = {
    position: []
  };

  ngOnInit(): void {
    this.getFormsValue();
  }

  // create filter
  getFormsValue(): void {
    this.dataSource.filterPredicate = (data, filter: string): boolean => {
      const searchString = JSON.parse(filter);
      let isPositionAvailable = false;
      if (searchString.position.length) {
        for (const d of searchString.position) {
          if (data.position.trim() === d) {
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

  filterCustomers(): void {
      this.filterValues['position'] = this.customers;
      this.dataSource.filter = JSON.stringify(this.filterValues);
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

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our customer
    if (value) {
      this.customers.push(value);
      this.customersChange$.next(this.customers);
    }
    // Clear the input value
    event.input.value = '';
    this.customersCtrl.setValue(null);
    this.filterCustomers();

  }

  remove(customer: string): void {
    const index = this.customers.indexOf(customer);

    if (index >= 0) {
      this.customers.splice(index, 1);
    }
    this.filterCustomers();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.customers.push(event.option.viewValue);
    this.customersInput!.nativeElement.value = '';
    this.customersCtrl.setValue(null);

    this.filterCustomers();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCustomers.filter(customer => customer.toLowerCase().indexOf(filterValue) === 0);
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
