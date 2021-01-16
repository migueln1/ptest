import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from "../products/products.component";
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  @Input() products: Product[] = []
  @Input() userAdmin: boolean = false
  @Output() removeProductEventMain = new EventEmitter<string>();

  constructor() { }
  removeProduct(id: string){
    this.removeProductEventMain.emit(id)
  }
}
