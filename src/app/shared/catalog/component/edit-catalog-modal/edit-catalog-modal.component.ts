import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-catalog-modal',
  templateUrl: './edit-catalog-modal.component.html',
  styleUrls: ['./edit-catalog-modal.component.scss']
})
export class EditCatalogModalComponent implements OnInit {
  public foods: any = [
    { value: 'In stock', viewValue: 'In stock' },
    { value: 'Out of stock', viewValue: 'Out of stock' },
    { value: 'Discontinued', viewValue: 'Discontinued' }
  ];
  public selected = new FormControl('In stock');

  constructor() {
  }

  ngOnInit(): void {
  }

}
