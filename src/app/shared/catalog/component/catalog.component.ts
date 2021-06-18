import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { SidenavService } from 'src/app/services/sidenav/sidenav.service';
import { ICatalog } from 'src/app/interfaces/interfaces';
import { DeleteCatalogModalComponent } from './delete-catalog-modal/delete-catalog-modal.component';
import { Store } from '@ngrx/store';
import { CatalogFilterService } from 'src/app/services/catalog-filter/catalog-filter.service';
import { ReplaceCatalogModalComponent } from './replace-catalog-modal/replace-catalog-modal.component';
import { AddCatalogModalComponent } from './add-catalog-modal/add-catalog-modal.component';
import { EditCatalogModalComponent } from './edit-catalog-modal/edit-catalog-modal.component';

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
  // progress bar
  public valueAddModal = 0;
  public valueFileModal = 0;
  public bufferValueAddModal = 100;
  public bufferValueFileModal = 100;
  public progressAddModalStatus: boolean;
  public progressFileModalStatus: boolean;

  constructor(
    // private store: Store<IState>,
    private dataFilter: CatalogFilterService,
    private sidenavService: SidenavService,
    public dialog: MatDialog
  ) {
    this.progressAddModalStatus = false;
    this.progressFileModalStatus = false;
    this.paginator = null;
    this.sort = null;
    this.sideMenuStatus = true;
    this.displayedColumns = this.dataFilter.displayedColumns;
    this.availabilityList = this.dataFilter.availabilityList;
    this.dataSource = this.dataFilter.dataSource;
  }

  openDeleteModal(event: any, name: string, code: string): void {
    this.dialog.open(DeleteCatalogModalComponent, {
      data: {
        catalogCode: code,
        catalogName: name
      }
    });
  }

  openReplaceModal(): void {
    this.dialog.open(ReplaceCatalogModalComponent, {
      data: {}
    }).afterClosed().subscribe(() => this.openProgressFileModal());
  }

  openAddModal(): void {
    this.dialog.open(AddCatalogModalComponent, {
      data: {}
    }).afterClosed().subscribe(() => this.openProgressAddModal());
  }

  openEditModal(event: any, code: string): void {
    if (event.target.localName === 'td') {
      const data = this.dataSource.data.filter((item: ICatalog) => item.code === code)[0];
      this.dialog.open(EditCatalogModalComponent, {
        data: {
          dataRow: data
        }
      });
    }
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

  openProgressFileModal(): void {
    this.progressFileModalStatus = true;
    const timerId = setInterval(() => {
      if (this.valueFileModal < 105) {
        this.valueFileModal++;
      } else {
        this.progressFileModalStatus = false;
        clearTimeout(timerId);
      }
    }, 30);
    this.valueFileModal = 0;
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
