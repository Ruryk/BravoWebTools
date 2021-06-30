import { Component, OnInit } from '@angular/core';

import { SidenavService } from 'src/app/services/sidenav/sidenav.service';
import { onMainContentChange } from 'src/app/animations/animations';
import { DataService } from '../../../services/data/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [onMainContentChange]
})
export class MainComponent implements OnInit {

  public onSideNavChange?: boolean;

  constructor(
    private dataService: DataService,
    private sidenavService: SidenavService
  ) {
    this.onSideNavChange = true;
    this.sidenavService.sideNavState$.subscribe(res => {
      this.onSideNavChange = res;
    });
  }

  ngOnInit(): void {
    this.dataService.getCatalogList();
  }
}
