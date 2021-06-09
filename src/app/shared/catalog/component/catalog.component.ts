import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { SidenavService } from 'src/app/services/sidenav/sidenav.service';
import { CatalogTableElement, ICatalog, ICatalogState } from '../../../interfaces/interfaces';
import { DeleteCatalogModalComponent } from './delete-catalog-modal/delete-catalog-modal.component';
import { Store } from '@ngrx/store';
import { getCatalogDataSource, IState } from '../../../reducers';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort: MatSort | null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null;
  public sideMenuStatus: boolean;
  public displayedColumns: string[] = ['code', 'name', 'unit', 'price', 'availability', 'actions'];
  public availabilityList: string[] = ['In stock', 'Out of stock', 'Discontinued'];
  public filterValues: any = {
    customer: [],
    column: 'availability'
  };
  public dataCatalog = this.store.select(getCatalogDataSource);
  public dataSource: MatTableDataSource<ICatalog>;

  constructor(
    private store: Store<IState>,
    private sidenavService: SidenavService,
    public dialog: MatDialog
  ) {
    this.paginator = null;
    this.sort = null;
    this.sideMenuStatus = true;
    this.dataSource = new MatTableDataSource<ICatalog>();
    this.dataCatalog.subscribe((data: ICatalogState) => this.dataSource.data = Object.values(data));
  }

  openDeleteModal(): void {
    this.dialog.open(DeleteCatalogModalComponent, {
      data: {
        animal: 'panda'
      }
    });
  }

  ngOnInit(): void {
    this.setDataSourceFiltering();
  }

  setDataSourceFiltering(): void {
    this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
      const searchString = JSON.parse(filter);
      const column = searchString.column;
      let isPositionAvailable = false;
      if (searchString.customer.length) {
        if (column !== 'name') {
          for (const d of searchString.customer) {
            if (data[column].trim().toLowerCase() === d.toLowerCase()) {
              isPositionAvailable = true;
            }
          }
        }else{
            if (data[column].trim().toLowerCase().includes(searchString.customer[0].toLowerCase())) {
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
    this.dataSource.filter = JSON.stringify({ customer: [filterValue.trim().toLowerCase()], column: 'name' });
  }

  availabilityFilter(value: string[]): void {
    this.dataSource.filter = JSON.stringify({ customer: [...value], column: 'availability' });
  }
}

const ELEMENT_DATA: CatalogTableElement[] = [

];
