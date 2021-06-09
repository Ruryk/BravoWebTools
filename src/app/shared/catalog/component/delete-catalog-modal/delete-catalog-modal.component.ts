import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-catalog-modal',
  templateUrl: './delete-catalog-modal.component.html',
  styleUrls: ['./delete-catalog-modal.component.scss']
})
export class DeleteCatalogModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

}
