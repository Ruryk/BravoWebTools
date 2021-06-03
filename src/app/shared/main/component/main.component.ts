import { Component, OnInit } from '@angular/core';

import { SidenavService } from 'src/app/services/sidenav/sidenav.service';
import { onMainContentChange } from 'src/app/animations/animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [ onMainContentChange ]
})
export class MainComponent implements OnInit {

  public onSideNavChange?: boolean;

  constructor(private sidenavService: SidenavService) {
    this.sidenavService.sideNavState$.subscribe( res => {
      console.log(res);
      this.onSideNavChange = res;
    });
  }

  ngOnInit(): void {
  }
}
