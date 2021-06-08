import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFilterMenuComponent } from './select-filter-menu.component';

describe('SelectFilterMenuComponent', () => {
  let component: SelectFilterMenuComponent;
  let fixture: ComponentFixture<SelectFilterMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectFilterMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFilterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
