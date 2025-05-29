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
  productHistorySum: Record<string, { totalQuantity: number, totalPrice: number }> = {};

  router = inject(Router);
  productsService = inject(ProductsService);
  ngOnInit() {
    for (const [key, products] of Object.entries(this.productHistory)) {
      this.productHistorySum[key] = {
        totalQuantity: products.reduce((sum, p) => sum + p.quantity, 0),
        totalPrice: products.reduce((sum, p) => sum + (p.price! * p.quantity), 0),
      };
    }
  }
  goToProduct(id: string): void {
    this.router.navigate(['/product', Number(id)]);
  }

  get productHistoryEntries() {
    return Object.entries(this.productHistory);
  }


}
