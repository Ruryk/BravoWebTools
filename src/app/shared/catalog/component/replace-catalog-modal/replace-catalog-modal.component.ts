import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CsvCheckService } from '../../../../services/csv-check/csv-check.service';

@Component({
  selector: 'app-replace-catalog-modal',
  templateUrl: './replace-catalog-modal.component.html',
  styleUrls: ['./replace-catalog-modal.component.scss']
})
export class ReplaceCatalogModalComponent implements OnInit {

  public fileLoad: any | null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private csvService: CsvCheckService
    ) {
    this.fileLoad = null;
  }

  ngOnInit(): void {
  }

  handleFileInput(event: any): void {
    this.fileLoad = event.target.files[0];
    console.log(this.fileLoad);
    this.csvService.sendFile(this.fileLoad);
  }

  fileRemove(): void{
    this.fileLoad = null;
  }
}
