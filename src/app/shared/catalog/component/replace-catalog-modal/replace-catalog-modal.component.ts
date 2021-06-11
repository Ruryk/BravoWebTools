import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-replace-catalog-modal',
  templateUrl: './replace-catalog-modal.component.html',
  styleUrls: ['./replace-catalog-modal.component.scss']
})
export class ReplaceCatalogModalComponent implements OnInit {

  public fileLoad: any | null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.fileLoad = null;
  }

  ngOnInit(): void {
  }

  handleFileInput(event: any): void {
    this.fileLoad = event.target.files[0];
  }

  fileRemove(): void{
    this.fileLoad = null;
  }
}
