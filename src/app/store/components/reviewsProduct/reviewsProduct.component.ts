import { Component, computed, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StringUtils } from '@shared/utils/string.utils';
import { Product } from '@store/interfaces/product.interface';
import { ProductsService } from '@store/services/products.service';
import { UserService } from '@store/services/user.service';

@Component({
  selector: 'reviews-product',
  imports: [],
  templateUrl: './reviewsProduct.component.html',
})
export class ReviewsProductComponent {

  @Input() reviews: Product["reviews"] = [];
  productsService = inject(ProductsService);
  route = inject(ActivatedRoute);
  userService = inject(UserService);
  stringUtils = inject(StringUtils);
  productId: string = '';

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id') ?? '';
  }

  // Computed que devuelve el valor actualizado
  review = computed(() => {
    const reviews = this.productsService.reviewProduct();
    const id = this.productId;

    if (reviews && id) {
      return reviews[id]["review"];
    }
    return null;
  });

  date = computed(() => {
    const reviews = this.productsService.reviewProduct();
    const id = this.productId;

    if (reviews && id) {
      return reviews[id]["date"];
    }
    return null;
  });
}
