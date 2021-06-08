import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerMenuComponent } from './date-picker-menu.component';

describe('DatePickerMenuComponent', () => {
  let component: DatePickerMenuComponent;
  let fixture: ComponentFixture<DatePickerMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatePickerMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
