import { Component, Input, OnInit } from '@angular/core';
import { Product } from "../products/products.component";
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  @Input() products: Product[] = []
  constructor() { }


}
