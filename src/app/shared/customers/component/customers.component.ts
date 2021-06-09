import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { SidenavService } from 'src/app/services/sidenav/sidenav.service';
import { AddCustomerModalComponent } from './add-customer-modal/add-customer-modal.component';
import { EditCustomerModalComponent } from './edit-customer-modal/edit-customer-modal.component';
import { ICustomers, ICustomersState } from '../../../interfaces/interfaces';
import { Store } from '@ngrx/store';
import { getCustomersDataSource, IState } from '../../../reducers';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements AfterViewInit {
  @ViewChild(MatSort) sort: MatSort | null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null;
  public sideMenuStatus: boolean;
  public displayedColumns: string[] = ['customerNo', 'name', 'address', 'days'];
  public dataCustomers = this.store.select(getCustomersDataSource);
  public dataSource: MatTableDataSource<ICustomers>;

  constructor(
    private store: Store<IState>,
    private sidenavService: SidenavService,
    public dialog: MatDialog
  ) {
    this.paginator = null;
    this.sort = null;
    this.sideMenuStatus = true;
    this.dataSource = new MatTableDataSource<ICustomers>();
    this.dataCustomers.subscribe((data: ICustomersState) => this.dataSource.data = Object.values(data));
  }

  ngAfterViewInit(): void {
    this.dataSource!.paginator = this.paginator;
    this.dataSource!.sort = this.sort;
  }

  onSideNavToggle(): void {
    this.sideMenuStatus = !this.sideMenuStatus;
    this.sidenavService.sideNavState$.next(this.sideMenuStatus);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource!.filter = filterValue.trim().toLowerCase();
  }

  openModalAddCustomer(): void {
    this.dialog.open(AddCustomerModalComponent, {
      maxHeight: '100vh'
    });
  }

  openModalEditCustomer(): void {
    this.dialog.open(EditCustomerModalComponent, {
      maxHeight: '100vh'
    });
  }
}
