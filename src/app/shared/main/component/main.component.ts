import { Component, OnInit } from '@angular/core';

import { SidenavService } from 'src/app/services/sidenav/sidenav.service';
import { onMainContentChange } from 'src/app/animations/animations';
import { DataService } from '../../../services/data/data.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [onMainContentChange]
})
export class MainComponent implements OnInit {

  // public onSideNavChange?: boolean;
  public onSideNavChange?: BehaviorSubject<boolean>;

  constructor(
    private dataService: DataService,
    private sidenavService: SidenavService
  ) {
    this.onSideNavChange = this.sidenavService.sideNavState$;
    // this.sidenavService.sideNavState$.subscribe(res => {
    //   this.onSideNavChange = res;
    // });
  }

  ngOnInit(): void {
    this.dataService.getCatalogList();
    this.dataService.getCustomersList();
    this.dataService.getOrdersList();
  }
}
