import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-date-picker-menu',
  templateUrl: './date-picker-menu.component.html',
  styleUrls: ['./date-picker-menu.component.scss']
})
export class DatePickerMenuComponent implements OnInit {

  @Input() public dataSource!: MatTableDataSource<any>;
  constructor() { }

  ngOnInit(): void {
  }

}
