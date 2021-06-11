import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplaceCatalogModalComponent } from './replace-catalog-modal.component';

describe('ReplaceCatalogModalComponent', () => {
  let component: ReplaceCatalogModalComponent;
  let fixture: ComponentFixture<ReplaceCatalogModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplaceCatalogModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplaceCatalogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
