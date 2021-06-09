import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCatalogModalComponent } from './delete-catalog-modal.component';

describe('DeleteCatalogModalComponent', () => {
  let component: DeleteCatalogModalComponent;
  let fixture: ComponentFixture<DeleteCatalogModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCatalogModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCatalogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
