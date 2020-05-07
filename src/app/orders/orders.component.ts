import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  order$: Observable<any>;

  constructor(
    private order: OrderService
  ) { }

  ngOnInit(): void {
    this.order$ = this.order.getOrders("orderId");

  }
  getOrders(para1) {
    this.order$ = this.order.getOrders(para1);
  }

}
