import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() productName: string = '';
  @Input() productPrice: string = '';
  @Input() imageUrl: string = '';
  constructor() {
    console.log(this.imageUrl)
   }
}
