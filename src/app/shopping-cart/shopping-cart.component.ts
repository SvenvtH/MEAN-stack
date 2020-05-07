import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<any>;

  constructor(
    private cart: CartService
  ) { }

  ngOnInit(): void {
    this.cart$ = this.cart.getCart();
  }

  deleteCartItem(productId) {
    this.cart.deleteCartItem(productId);
  }

}
