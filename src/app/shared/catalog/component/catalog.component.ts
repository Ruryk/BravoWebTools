import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SidenavService } from 'src/app/services/sidenav/sidenav.service';
import { ICatalog } from 'src/app/interfaces/interfaces';
import { CatalogFilterService } from 'src/app/services/catalog-filter/catalog-filter.service';
import { CAvailabilityList, CDisplayedCatalogColumns } from 'src/app/constantes/constantes';
import { ReplaceCatalogModalComponent } from './replace-catalog-modal/replace-catalog-modal.component';
import { DeleteCatalogModalComponent } from './delete-catalog-modal/delete-catalog-modal.component';
import { AddCatalogModalComponent } from './add-catalog-modal/add-catalog-modal.component';
import { EditCatalogModalComponent } from './edit-catalog-modal/edit-catalog-modal.component';
import { getCatalogErrorMessage, IState } from '../../../reducers';
import { element } from 'protractor';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  providers: [CatalogFilterService]
})
export class CatalogComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort | null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null;
  public unsubscribe$: Subject<void>;
  public deleteModalOpened: { status: boolean, code: string };
  public displayedColumns: string[] = CDisplayedCatalogColumns;
  public availabilityList: string[] = CAvailabilityList;
  public dataSource!: MatTableDataSource<ICatalog>;
  // progress bar
  public valueAddModal = 0;
  public valueFileModal = 0;
  public bufferValueAddModal = 100;
  public bufferValueFileModal = 100;
  public progressAddModalStatus: boolean;
  public progressFileModalStatus: boolean;
  public errorStatus$ = this.store.select(getCatalogErrorMessage);

  constructor(
    private dataFilterFilterService: CatalogFilterService,
    private sidenavService: SidenavService,
    public dialog: MatDialog,
    public store: Store<IState>
  ) {
    this.unsubscribe$ = new Subject<void>();
    this.deleteModalOpened = {
      status: false,
      code: ''
    };
    this.progressAddModalStatus = false;
    this.progressFileModalStatus = false;
    this.paginator = null;
    this.sort = null;
    this.dataSource = this.dataFilterFilterService.dataSource;
  }

  openDeleteModal(event: any, name: string, code: string): void {
    this.deleteModalOpened.status = true;
    this.deleteModalOpened.code = code;
    this.dialog.open(DeleteCatalogModalComponent, {
      data: {
        catalogCode: code,
        catalogName: name
      }
    }).afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe((status) => {
      this.deleteModalOpened.status = false;
      this.deleteModalOpened.code = '';
      if (status) {
        this.openProgressAddModal();
      }
    });
  }

  openReplaceModal(): void {
    this.dialog.open(ReplaceCatalogModalComponent, {
      data: {}
    }).afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe((status) => {
      if (status) {
        this.openProgressFileModal();
      }
    });
  }

  openAddModal(): void {
    this.dialog.open(AddCatalogModalComponent, {
      data: {}
    }).afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe((status) => {
      if (status) {
        this.openProgressAddModal();
      }
    });
  }

  openEditModal(event: any, code: string): void {
    if (event.target.localName === 'td') {
      const data = this.dataSource.data.filter((item: ICatalog) => item.code === code)[0];
      this.dialog.open(EditCatalogModalComponent, {
        data: {
          dataRow: data
        }
      }).afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe((status) => {
        if (status) {
          this.openProgressAddModal();
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

  closeProgressAddModal(): void {
    this.progressAddModalStatus = false;
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

  closeProgressFileModal(): void {
    this.progressFileModalStatus = false;
    this.valueFileModal = 0;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataFilterFilterService.dataSource!.paginator = this.paginator;
    this.dataFilterFilterService.dataSource!.sort = this.sort;
  }

  onSideNavToggle(): void {
    this.sidenavService.changeSideNavState();
  }

  setSearchStringFilter({ target }: Event): void {
    const elementTarget = target as HTMLInputElement ;
    const filter = elementTarget.value.trim().toLowerCase().length > 0 ?
      elementTarget.value.trim().toLowerCase() : null;
    this.dataFilterFilterService.searchStringFilterValue.next(filter);
  }

  setAvailabilityFilter(filterValue: string[]): void {
    const filter = (filterValue.length) ? filterValue : null;
    this.dataFilterFilterService.availabilityFilterValue.next(filter);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
