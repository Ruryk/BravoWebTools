import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { config } from 'src/app/constantes/constantes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsvCheckService {

  constructor(private http: HttpClient) {
  }

  sendFile(file: any): any {
// Create form data
    const formData = new FormData();
    // Store form name as "file" with file data
    formData.append('file', file, file.name);
    return this.http.post(`${ config.server }/csv/check`, formData);
  }

  replaceCatalog(): Observable<any> {
    return this.http.post(`${ config.server }/csv/replace`, null);
  }
}
