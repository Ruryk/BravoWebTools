import { Component, OnInit } from '@angular/core';

import { onSideNavChange, animateText } from 'src/app/animations/animations';
import { SidenavService } from 'src/app/services/sidenav/sidenav.service';

interface NavigationList {
  link: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [onSideNavChange, animateText]
})
export class SideNavComponent implements OnInit {

  public sideNavState: boolean;
  public linkText: boolean;

  public navigation: NavigationList[] = [
    { name: 'Orders', link: 'orders', icon: 'shopping-cart' },
    { name: 'Catalog', link: 'catalog', icon: 'tag' },
    { name: 'Customers', link: 'customers', icon: 'user' },
    { name: 'Log Out', link: 'logout', icon: 'log-out' }
  ];

  constructor(private sidenavService: SidenavService) {
    this.sideNavState = true;
    this.linkText = true;
  }

  ngOnInit(): void {
  }

  onSinenavToggle(): void {
    this.sideNavState = !this.sideNavState;

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    this.sidenavService.sideNavState$.next(this.sideNavState);
  }
}
