import { Component, computed, inject } from '@angular/core';
import { CardCartComponent } from "./components/cardCart/cardCart.component";
import { ProductsService } from '@store/services/products.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'modal-cart',
  imports: [CardCartComponent, RouterModule],
  templateUrl: './modalCart.component.html'
})
export class ModalCartComponent {

  productsService = inject(ProductsService);

  totalUnits = computed(() =>
    this.productsService.productsCart().reduce((acc, item) => acc + item.quantity, 0)
  );

  totalPrice = computed(() =>
    this.productsService.productsCart().reduce((acc, item) => acc + item.price! * item.quantity, 0).toFixed(2)
  );
  closeDrawer() {
    const closeBtn = document.querySelector('button[data-overlay="#overlay-end-example"][aria-label="Close"]');
    if (closeBtn) {
      (closeBtn as HTMLElement).click();
    }
  }
}
