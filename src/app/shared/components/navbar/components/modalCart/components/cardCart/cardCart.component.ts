import { Component, inject, effect } from '@angular/core';
import { Router } from '@angular/router';
import { CartProduct } from '@store/interfaces/productCart.interface';
import { ProductsService } from '@store/services/products.service';

@Component({
  selector: 'card-cart',
  imports: [],
  templateUrl: './cardCart.component.html',
})
export class CardCartComponent {
  router = inject(Router);
  productsService = inject(ProductsService);

  goToProduct(id: string): void {
    this.closeDrawer();
    this.router.navigate(['/product', Number(id)]);
  }

  closeDrawer() {
    const closeBtn = document.querySelector('button[data-overlay="#overlay-end-example"][aria-label="Close"]');
    if (closeBtn) {
      (closeBtn as HTMLElement).click();
    }
  }

}
