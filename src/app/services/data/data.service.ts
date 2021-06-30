import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { ICatalog, ICatalogState } from 'src/app/interfaces/interfaces';
import { IState } from 'src/app/reducers';
import { config } from 'src/app/constantes/constantes';
import { SetCatalogStateAction } from '../../reducers/catalog/catalog.actions';

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
      const catalogState = res.reduce((data: any, item: ICatalog) => {
        data[item.code] = item;
        return data;
      }, {} as ICatalogState);
      this.store.dispatch(new SetCatalogStateAction({ data: catalogState }));
    });
  }
}
