import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { config } from 'src/app/constantes/constantes';

@Injectable({
  providedIn: 'root'
})
export class CsvCheckService {

  constructor(private http: HttpClient) {
  }

  sendFile(file: any): void {
// Create form data
    const formData = new FormData();
    // Store form name as "file" with file data
    formData.append('file', file, file.name);
    this.http.post(`${ config.server }/csv/check`,  formData).subscribe(res => console.log(res));
  }
}
