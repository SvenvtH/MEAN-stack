import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartId: string;

  constructor(
    private http: HttpClient
  ) {

  }

  getCartId = () => {
    return "12345";
    if (this.cartId) return this.cartId;
    else {
      this.cartId = makeid(20);
      return this.cartId;
    }

    function makeid(length) {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
  }

  getCart = () => {
    return this.http.get(`${environment.api}/cart/${this.getCartId()}`);
  }

  deleteCartItem = (id: string) => {
    this.getCart().subscribe(cart => {
      for (let i = 0; i < cart["products"].length; i++) {
        console.log(id);
        if (cart["products"][i]["productId"] === id) {
          console.log(cart["products"][i]["productId"] + "=" + id)
          console.log(cart["products"].splice( i, 1));
        }
      }
      return this.http.post(`${environment.api}/cart/${this.getCartId()}`, cart).subscribe(cart => { console.log(cart) });
    })
  }
}
