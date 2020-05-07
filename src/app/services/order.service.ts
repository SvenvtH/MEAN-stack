import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment'
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) {

  }

  getOrders = (sortType:string) => {
    return this.http.get(`${environment.api}/orders/${sortType}`);
  }

  getOrderDetail = (orderId:string) => {
    return this.http.get(`${environment.api}/order/${orderId}`);
  }

  changeOrderDetail = (orderId:string) => {
    this.getOrderDetail(orderId).subscribe(order => {
      console.log(order);
      return this.http.put(`${environment.api}/order/${orderId}`, order);
    })
  }
}
