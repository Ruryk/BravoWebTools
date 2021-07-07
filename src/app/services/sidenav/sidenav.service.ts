import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class SidenavService {

  public sideNavState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public sideNavState: boolean;

  constructor() {
    this.sideNavState = true;
    this.sideNavState$.subscribe(value => this.sideNavState = value);
  }

  changeSideNavState(): void {
    this.sideNavState$.next(!this.sideNavState);
  }
}
