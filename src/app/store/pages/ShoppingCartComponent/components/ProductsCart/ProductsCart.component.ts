import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@store/services/products.service';

@Component({
  selector: 'products-cart',
  imports: [],
  templateUrl: './ProductsCart.component.html',
})
export class ProductsCartComponent {

  router = inject(Router);
  productsService = inject(ProductsService);
  cantidad: number = 0;

  goToProduct(id: string): void {
    this.router.navigate(['/product', Number(id)]);
  }

  closeDrawer() {
    const closeBtn = document.querySelector('button[data-overlay="#overlay-end-example"][aria-label="Close"]');
    if (closeBtn) {
      (closeBtn as HTMLElement).click();
    }
  }

  increase(productId: string) {
    this.productsService.increaseProduct(productId);
  }

  decrease(productId: string) {
    this.productsService.decreaseProduct(productId);
  }
}
