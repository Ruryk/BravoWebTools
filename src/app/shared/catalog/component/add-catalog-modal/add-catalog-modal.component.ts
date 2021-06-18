import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IState } from '../../../../reducers';
import { Store } from '@ngrx/store';
import { AddNewCatalogAction } from '../../../../reducers/catalog/catalog.actions';

@Component({
  selector: 'app-add-catalog-modal',
  templateUrl: './add-catalog-modal.component.html',
  styleUrls: ['./add-catalog-modal.component.scss']
})
export class AddCatalogModalComponent implements OnInit {
  public addCatalogGroup: FormGroup;
  public validation: boolean;
  public availability: any = [
    { value: 'In stock', viewValue: 'In stock' },
    { value: 'Out of stock', viewValue: 'Out of stock' },
    { value: 'Discontinued', viewValue: 'Discontinued' }
  ];

  constructor(
    private store: Store<IState>,
    private fb: FormBuilder
  ) {
    this.validation = false;
    this.addCatalogGroup = fb.group({
      code: new FormControl('REG88', [Validators.required]),
      name: new FormControl('Orange', [Validators.required]),
      units: fb.array([
        fb.group({
          unit: new FormControl('box', [Validators.required]),
          price: new FormControl('10.30', [Validators.required])
        })
      ]),
      availability: new FormControl(`In stock`, [Validators.required]),
      exclusively: new FormControl('TOM53, APP123', [Validators.required]),
      replacementProducts: new FormControl('13423-kd', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  addUnit(): void {
    (this.addCatalogGroup.controls.units as FormArray).push(this.fb.group({
      unit: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required])
    }));
  }

  deleteUnit(id: number): void {
    (this.addCatalogGroup.controls.units as FormArray).removeAt(id);
  }

  addCatalog(): void {
    if (this.addCatalogGroup.valid) {
      const dataForm = {
        ...this.addCatalogGroup.value,
        exclusively: this.addCatalogGroup.controls.exclusively.value.split(',').map((el: string) => el.trim()),
        replacementProducts: this.addCatalogGroup.controls.replacementProducts.value.split(',').map((el: string) => el.trim()),
        actions: 'trash'
      };
      this.store.dispatch(new AddNewCatalogAction({
        code: this.addCatalogGroup.get('code')?.value,
        data: dataForm
      }));
    } else {
      this.validation = true;
    }
  }

  getArrayUnitsControls(): any{
    return this.addCatalogGroup.controls.units as FormArray;
  }
}