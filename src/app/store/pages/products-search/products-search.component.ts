import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productCardComponent } from '@store/components/card/productCard.component';
import { Product } from '@store/interfaces/product.interface';

@Component({
  selector: 'app-products-search',
  imports: [productCardComponent],
  templateUrl: './products-search.component.html',
})
export class ProductsSearchComponent {
  products = signal<Product[]>([]);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.loadProducts();
    });
  }
  loadProducts() {
    window.scrollTo(0, 0);
    const productsJson = localStorage.getItem('products');
    this.products.set(productsJson ? JSON.parse(productsJson) : []);
  }
}
