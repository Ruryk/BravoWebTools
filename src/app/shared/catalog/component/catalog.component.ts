import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { SidenavService } from 'src/app/services/sidenav/sidenav.service';

export interface TableElement {
  code: string;
  name: string;
  unit: string;
  price: number;
  availability: string;
  actions: string;
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
  public displayedColumns: string[] = ['code', 'name', 'unit', 'price', 'availability', 'actions'];
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

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

const ELEMENT_DATA: TableElement[] = [
  {
    code: 'APP123',
    name: 'Apples',
    unit: 'kg +2 more',
    price: 2.03,
    availability: `In stock`,
    actions: `trash`
  }, {
    code: 'TOM53',
    name: 'Tomatos',
    unit: 'box +1 more',
    price: 12.03,
    availability: `In stock`,
    actions: `trash`
  }, {
    code: 'CUC997',
    name: 'Cucumbers',
    unit: 'pcs',
    price: 0.52,
    availability: `Out of stock`,
    actions: `trash`
  }
];
