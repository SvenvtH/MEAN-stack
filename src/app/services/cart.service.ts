import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Import
import { CookieService } from 'ngx-cookie-service';

import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartId: string;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {

  }

  getCartId = () => {
    let cookieExists: boolean = this.cookieService.check('cartid');
    if (cookieExists) {
      console.log(this.cookieService.get('cartid'));
      return this.cookieService.get('cartid');
    } else {
      this.cartId = makeid(5);
      this.cookieService.set('cartid',this.cartId);
      console.log(this.cookieService.get('cartid'));
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
          console.log(cart["products"].splice(i, 1));
        }
      }
      return this.http.post(`${environment.api}/cart/${this.getCartId()}`, cart).subscribe(cart => { console.log(cart) });
    })
  }
}
