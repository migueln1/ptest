import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() productName: string = '';
  @Input() productPrice: string = '';
  @Input() imageUrl: string = '';
  @Input() id: string = '';
  @Input() userAdmin: boolean = false

  @Output() removeProductEvent = new EventEmitter<string>();

  constructor() {
   }

   removeProduct(id: string) {
     this.removeProductEvent.emit(id);
   }
}
