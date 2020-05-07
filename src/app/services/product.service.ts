import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) {

  }

  getProducts = (sortType: string) => {
    return this.http.get(`${environment.api}/products/${sortType}`);
  }

  getProductDetail = (id:string) => {
    return this.http.get(`${environment.api}/product/${id}`);
  }
}
