import { Injectable } from '@angular/core';
import { IErrorState } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  public errorState: IErrorState;

  constructor() {
    this.errorState = {
      catalog: {},
      customers: {}
    };
  }
}
