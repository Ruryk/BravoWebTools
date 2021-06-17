import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { onSideNavChange, animateText } from 'src/app/animations/animations';
import { SidenavService } from 'src/app/services/sidenav/sidenav.service';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

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
export class SideNavComponent implements OnDestroy {

  public sideNavState: boolean;
  public linkText: boolean;
  private unsubscribe$: Subject<void> = new Subject<void>();

  public navigation: NavigationList[] = [
    { name: 'Orders', link: 'orders', icon: 'shopping-cart' },
    { name: 'Catalog', link: 'catalog', icon: 'tag' },
    { name: 'Customers', link: 'customers', icon: 'user' },
    { name: 'Log Out', link: 'logout', icon: 'log-out' }
  ];

  constructor(
    private authentication: AuthenticationService,
    private sidenavService: SidenavService
  ) {
    this.sideNavState = true;
    this.linkText = true;
    this.sidenavService.sideNavState$.pipe(takeUntil(this.unsubscribe$)).subscribe((res: boolean) => {
      this.sideNavState = res;
      this.linkText = res;
    });
  }

  checkPath(event: any): void {
    if (event.target.getAttribute('path') === 'logout') {
      event.preventDefault();
      this.authentication.logout();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
