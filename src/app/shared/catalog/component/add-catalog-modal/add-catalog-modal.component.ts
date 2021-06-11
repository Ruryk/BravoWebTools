import { Component, OnInit } from '@angular/core';
import { FormControl,  Validators} from '@angular/forms';

@Component({
  selector: 'app-add-catalog-modal',
  templateUrl: './add-catalog-modal.component.html',
  styleUrls: ['./add-catalog-modal.component.scss']
})
export class AddCatalogModalComponent implements OnInit {
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
