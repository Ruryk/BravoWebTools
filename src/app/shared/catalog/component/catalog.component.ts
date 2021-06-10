import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { SidenavService } from 'src/app/services/sidenav/sidenav.service';
import { ICatalog} from 'src/app/interfaces/interfaces';
import { DeleteCatalogModalComponent } from './delete-catalog-modal/delete-catalog-modal.component';
import { Store } from '@ngrx/store';
import { CatalogFilterService } from 'src/app/services/catalog-filter/catalog-filter.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  providers: [CatalogFilterService]
})
export class CatalogComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort: MatSort | null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null;
  public sideMenuStatus: boolean;
  public displayedColumns: string[];
  public availabilityList: string[];
  public dataSource!: MatTableDataSource<ICatalog>;

  constructor(
    // private store: Store<IState>,
    private dataFilter: CatalogFilterService,
    private sidenavService: SidenavService,
    public dialog: MatDialog
  ) {
    this.paginator = null;
    this.sort = null;
    this.sideMenuStatus = true;
    this.displayedColumns = this.dataFilter.displayedColumns;
    this.availabilityList = this.dataFilter.availabilityList;
    this.dataSource = this.dataFilter.dataSource;
  }

  openDeleteModal(): void {
    this.dialog.open(DeleteCatalogModalComponent, {
      data: {
        animal: 'panda'
      }
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataFilter.dataSource!.paginator = this.paginator;
    this.dataFilter.dataSource!.sort = this.sort;
  }

  onSideNavToggle(): void {
    this.sideMenuStatus = !this.sideMenuStatus;
    this.sidenavService.sideNavState$.next(this.sideMenuStatus);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataFilter.applyFilter(filterValue);
  }

  availabilityFilter(filterValue: string[]): void {
    this.dataFilter.availabilityFilter(filterValue);
  }
}
