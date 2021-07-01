import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { ICatalog, ICatalogData, ICatalogState } from 'src/app/interfaces/interfaces';
import { IState } from 'src/app/reducers';
import { config } from 'src/app/constantes/constantes';
import { SetCatalogStateAction } from '../../reducers/catalog/catalog.actions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
    private store: Store<IState>
  ) {
  }

  async getCatalogList(): Promise<void> {
    this.http.get(`${ config.server }/catalog`).subscribe((res: any) => {
      const catalogState = res.reduce((data: ICatalogData, item: ICatalog) => {
        data[item.code] = item;
        return data;
      }, {} as ICatalogState);
      this.store.dispatch(new SetCatalogStateAction({ data: catalogState }));
    });
  }

  addNewCatalog(data: ICatalog): Observable<object> {
    return this.http.post(`${ config.server }/catalog/new`, { data });
  }

  editCatalog(code: string, data: ICatalog): Observable<object> {
    return this.http.post(`${ config.server }/catalog/edit`, { code, data });
  }

 deleteCatalog(code: string): Observable<object> {
    return this.http.post(`${ config.server }/catalog/delete`, { code });
  }
}
