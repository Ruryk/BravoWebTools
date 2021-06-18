import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getOrdersDataSourceForId, IState } from '../../../reducers';
import { IOrders } from '../../../interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-print-view',
  templateUrl: './print-view.component.html',
  styleUrls: ['./print-view.component.scss']
})
export class PrintViewComponent implements OnInit {
  public dateOrder: IOrders;
  public orderId: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<IState>
  ) {
    this.dateOrder = {};
    this.orderId = this.route.snapshot.params.id;
    this.store.select(getOrdersDataSourceForId, { id: this.orderId }).subscribe(data => this.dateOrder = data);
  }

  ngOnInit(): void {
    console.log(this.dateOrder);
  }

}
