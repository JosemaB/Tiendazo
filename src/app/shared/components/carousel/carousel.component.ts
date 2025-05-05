import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../store/interfaces/product.interface';

@Component({
  selector: 'app-carousel-3-img',
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
})
export class CarouselComponentTripleImg {

  @Input() product: Product = {};

}
