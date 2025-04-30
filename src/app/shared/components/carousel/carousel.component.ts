import { Component, Input } from '@angular/core';
import { Product } from '../../../store/interfaces/product.interface';

@Component({
  selector: 'app-carousel-3-img',
  imports: [],
  templateUrl: './carousel.component.html',
})
export class CarouselComponentTripleImg {

  @Input() product: Product = {};

}
