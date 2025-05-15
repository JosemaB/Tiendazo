import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from '@store/interfaces/product.interface';

@Component({
  selector: 'buscador-nav',
  imports: [],
  templateUrl: './buscadorNAv.component.html',
})
export class BuscadorNavComponent {
  @Input() products: Products = { products: [] };
  @Input() nameQuery: string = '';
  router = inject(Router);

  goToProduct(id: number): void {
    this.router.navigate(['/product', id]);
  }

  goToSearchProducts() {
    localStorage.setItem('products', JSON.stringify(this.products.products));
    this.router.navigate(['/searchProducts', this.nameQuery]);
  }

}
