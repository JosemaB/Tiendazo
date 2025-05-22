import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartProduct } from '@store/interfaces/productCart.interface';
import { ProductsService } from '@store/services/products.service';

@Component({
  selector: 'card-product-history',
  imports: [CommonModule],
  templateUrl: './cardProductHistory.component.html',
})
export class CardProductHistoryComponent {
  productHistory: { [date: string]: CartProduct[] } = JSON.parse(localStorage.getItem('purchaseHistory') || '{}');

  router = inject(Router);
  productsService = inject(ProductsService);

  goToProduct(id: string): void {
    this.router.navigate(['/product', Number(id)]);
  }

  get productHistoryEntries() {
    return Object.entries(this.productHistory);
  }


}
