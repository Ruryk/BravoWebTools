import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCatalogModalComponent } from './edit-catalog-modal.component';

describe('EditCatalogModalComponent', () => {
  let component: EditCatalogModalComponent;
  let fixture: ComponentFixture<EditCatalogModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCatalogModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCatalogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
