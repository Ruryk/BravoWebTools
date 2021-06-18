import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IState } from '../../../../reducers';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditCatalogAction } from '../../../../reducers/catalog/catalog.actions';

@Component({
  selector: 'app-edit-catalog-modal',
  templateUrl: './edit-catalog-modal.component.html',
  styleUrls: ['./edit-catalog-modal.component.scss']
})
export class EditCatalogModalComponent implements OnInit {
  public editCatalogGroup: FormGroup;
  public validation: boolean;
  public data: any;
  public availability: any = [
    { value: 'In stock', viewValue: 'In stock' },
    { value: 'Out of stock', viewValue: 'Out of stock' },
    { value: 'Discontinued', viewValue: 'Discontinued' }
  ];
  public selected = new FormControl('In stock');

  constructor(
    private store: Store<IState>,
    @Inject(MAT_DIALOG_DATA) public dataRow: any,
    private fb: FormBuilder
  ) {
    this.data = dataRow.dataRow;
    this.validation = false;
    this.editCatalogGroup = fb.group({
      code: new FormControl(this.data.code, [Validators.required]),
      name: new FormControl(this.data.name, [Validators.required]),
      units: fb.array([]),
      availability: new FormControl(this.data.availability, [Validators.required]),
      exclusively: new FormControl(this.data.exclusively.join(', '), [Validators.required]),
      replacementProducts: new FormControl(this.data.replacementProducts.join(', '), [Validators.required])
    });
    this.data.units.forEach((unit: any) => {
      (this.editCatalogGroup.controls.units as FormArray).push(fb.group({
        unit: new FormControl(unit.unit, [Validators.required]),
        price: new FormControl(unit.price, [Validators.required])
      }));
    });
  }

  ngOnInit(): void {
    localStorage.setItem('catalogCode', this.data.code);

  }

  addUnit(): void {
    (this.editCatalogGroup.controls.units as FormArray).push(this.fb.group({
      unit: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required])
    }));
  }

  deleteUnit(id: number): void {
    (this.editCatalogGroup.controls.units as FormArray).removeAt(id);
  }

  editCatalog(): void {
    if (this.editCatalogGroup.valid) {
      const dataForm = {
        ...this.editCatalogGroup.value,
        exclusively: this.editCatalogGroup.controls.exclusively.value.split(',').map((el: string) => el.trim()),
        replacementProducts: this.editCatalogGroup.controls.replacementProducts.value.split(',').map((el: string) => el.trim()),
        actions: 'trash'
      };
      this.store.dispatch(new EditCatalogAction({
        code: localStorage.getItem('catalogCode') || '',
        newCode: this.editCatalogGroup.controls.code.value,
        data: dataForm
      }));
    } else {
      this.validation = true;
    }
    localStorage.removeItem('catalogCode');
  }

  getArrayUnitsControls(): any{
   return this.editCatalogGroup.controls.units as FormArray;
  }
}
