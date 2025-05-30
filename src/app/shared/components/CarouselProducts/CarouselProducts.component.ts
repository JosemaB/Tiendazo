import { Component, Input } from '@angular/core';
import { Product } from '@store/interfaces/product.interface';
import { productCardComponent } from "@store/components/card/productCard.component";

@Component({
  selector: 'carousel-products',
  imports: [productCardComponent],
  templateUrl: './CarouselProducts.component.html',
})
export class CarouselProductsComponent {

  @Input() products: Product[] = [];

}
