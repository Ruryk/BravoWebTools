import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { SidenavService } from 'src/app/services/sidenav/sidenav.service';
import { ICustomers } from 'src/app/interfaces/interfaces';
import { getCustomersErrorMessage, IState } from 'src/app/reducers';
import { AddCustomerModalComponent } from './add-customer-modal/add-customer-modal.component';
import { EditCustomerModalComponent } from './edit-customer-modal/edit-customer-modal.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CustomersFilterService } from '../../../services/customers-filter/customers-filter.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort | null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null;
  public displayedColumns: string[] = ['customerNo', 'name', 'address', 'days'];
  public dataSource: MatTableDataSource<ICustomers>;
  public progressAddModalStatus: boolean;
  public valueAddModal = 0;
  public bufferValueAddModal = 100;
  public unsubscribe$: Subject<void>;
  public deleteModalOpened: { status: boolean, code: string };
  public errorStatus$ = this.store.select(getCustomersErrorMessage);

  constructor(
    private store: Store<IState>,
    private sidenavService: SidenavService,
    public dialog: MatDialog,
    private dataFilterService: CustomersFilterService
  ) {
    this.unsubscribe$ = new Subject<void>();
    this.progressAddModalStatus = false;
    this.deleteModalOpened = {
      status: false,
      code: ''
    };
    this.paginator = null;
    this.sort = null;
    this.dataSource = this.dataFilterService.dataSource;
  }

  ngAfterViewInit(): void {
    this.dataSource!.paginator = this.paginator;
    this.dataSource!.sort = this.sort;
  }

  onSideNavToggle(): void {
    this.sidenavService.changeSideNavState();
  }

  setSearchStringFilter({ target }: Event): void {
    const elementTarget = target as HTMLInputElement ;
    const filter = elementTarget.value.trim().toLowerCase().length > 0 ?
      elementTarget.value.trim().toLowerCase() : null;
    this.dataFilterService.searchStringFilterValue.next(filter);
  }

  openModalAddCustomer(): void {
    this.dialog.open(AddCustomerModalComponent, {
      maxHeight: '100vh'
    }).afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe((status) => {
      this.deleteModalOpened.status = false;
      this.deleteModalOpened.code = '';
      if (status) {
        this.openProgressAddModal();
      }
    });
  }

  openModalEditCustomer(event: any, code: string): void {
    const data = this.dataSource.data.filter((item: ICustomers) => item.customerNo === code)[0];
    this.dialog.open(EditCustomerModalComponent, {
      maxHeight: '100vh',
      data: {
        dataRow: data
      }
    }).afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe((status) => {
      this.deleteModalOpened.status = false;
      this.deleteModalOpened.code = '';
      if (status) {
        this.openProgressAddModal();
      }
    });
  }

  openProgressAddModal(): void {
    this.progressAddModalStatus = true;
    const timerId = setInterval(() => {
      if (this.valueAddModal < 105) {
        this.valueAddModal++;
      } else {
        this.progressAddModalStatus = false;
        clearTimeout(timerId);
      }
    }, 30);
    this.valueAddModal = 0;
  }

  closeProgressAddModal(): void {
    this.progressAddModalStatus = false;
    this.valueAddModal = 0;
  }

  getListDays(days: any): string {
    return Object.keys(days).filter(key => days[key] === true).join(',');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
