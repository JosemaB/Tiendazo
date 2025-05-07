import { Component, inject, Input } from '@angular/core';
import { StringUtils } from '@shared/utils/string.utils';
import { Product, Review } from '@store/interfaces/product.interface';

@Component({
  selector: 'reviews-product',
  imports: [],
  templateUrl: './reviewsProduct.component.html',
})
export class ReviewsProductComponent {

  @Input() reviews: Product["reviews"] = [];
  stringUtils = inject(StringUtils);
}
