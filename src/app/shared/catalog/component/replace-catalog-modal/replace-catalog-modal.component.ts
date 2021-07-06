import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CsvCheckService } from '../../../../services/csv-check/csv-check.service';
import { DataService } from '../../../../services/data/data.service';

@Component({
  selector: 'app-replace-catalog-modal',
  templateUrl: './replace-catalog-modal.component.html',
  styleUrls: ['./replace-catalog-modal.component.scss']
})
export class ReplaceCatalogModalComponent implements OnInit {

  public fileLoad: any | null;
  public fileStatus: { status: boolean, errors: object } | object;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private csvService: CsvCheckService,
    private dataService: DataService
  ) {
    this.fileLoad = null;
    this.fileStatus = {};
  }

  ngOnInit(): void {
  }

  handleFileInput(event: any): void {
    this.fileLoad = event.target.files[0];
    this.csvService.sendFile(this.fileLoad).subscribe((response: any) => {
     this.fileStatus = response;
    });
  }

  replaceCatalog(): void {
    this.csvService.replaceCatalog().subscribe(res => {
      if (res) { this.dataService.getCatalogList(); }
    });
  }

  fileRemove(): void {
    this.fileLoad = null;
  }
}
