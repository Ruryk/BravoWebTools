import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { SidenavService } from 'src/app/services/sidenav/sidenav.service';

export interface TableElement {
  customer: string;
  name: string;
  address: string;
  days: string;
}
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements AfterViewInit{
  @ViewChild(MatSort) sort: MatSort | null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null;
  public sideMenuStatus: boolean;
  public displayedColumns: string[] = ['customer', 'name', 'address', 'days'];
  public dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private sidenavService: SidenavService) {
    this.paginator = null;
    this.sort = null;
    this.sideMenuStatus = true;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onSideNavToggle(): void {
    this.sideMenuStatus = !this.sideMenuStatus;
    this.sidenavService.sideNavState$.next(this.sideMenuStatus);
  }
}

const ELEMENT_DATA: TableElement[] = [
  {
    customer: 'BB-123',
    name: 'Burger Bar',
    address: 'Main Street, 1234 Zurich',
    days: `Mon, Wed, Fri `
  }, {
    customer: 'GZ-889',
    name: 'Gyoza SS',
    address: 'Second Street 3421 Geneva',
    days: `Tue, Thu, Sat `
  }
];
