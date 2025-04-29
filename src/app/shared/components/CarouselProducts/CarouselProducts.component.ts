import { Component, Input } from '@angular/core';
import { Products } from '@store/interfaces/product.interface';
import { productCardComponent } from "@store/components/card/productCard.component";

@Component({
  selector: 'carousel-products',
  imports: [productCardComponent],
  templateUrl: './CarouselProducts.component.html',
})
export class CarouselProductsComponent {

  @Input() products: Products = {};


}
