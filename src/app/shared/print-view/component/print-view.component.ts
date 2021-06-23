import { Component } from '@angular/core';
import { IOrders } from '../../../interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-print-view',
  templateUrl: './print-view.component.html',
  styleUrls: ['./print-view.component.scss']
})
export class PrintViewComponent {
  private dataOrder: IOrders;

  constructor(private route: ActivatedRoute) {
    this.dataOrder = this.route.snapshot.data.post.data;
  }
}
