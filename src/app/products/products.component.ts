import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  product$: Observable<any>;

  constructor(
    private product: ProductService
  ) { }

  ngOnInit(): void {
    this.product$ = this.product.getProducts("name");
  }

  getProducts(para1) {
    this.product$ = this.product.getProducts(para1);
  }



}
