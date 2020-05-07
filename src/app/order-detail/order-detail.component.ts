import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  orderInfo$: Observable<any>;

  constructor(
    private orderInfo: OrderService,
    private route: ActivatedRoute
  ) { };

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderInfo$ = this.orderInfo.getOrderDetail(params.id);
    })
  }

  changeOrderDetail(para1) {
    this.orderInfo.changeOrderDetail(para1);
  }
}
