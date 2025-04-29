import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Products } from '@store/interfaces/product.interface';
import { ProductsService } from '@store/services/products.service';
import { productCardComponent } from "@store/components/card/productCard.component";
import { CarouselMainComponent } from "@store/components/carouselMain/carouselMain/carouselMain.component";
import { CarouselProductsComponent } from "@shared/components/CarouselProducts/CarouselProducts.component";
import { distinctUntilChanged, forkJoin, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [productCardComponent, CarouselMainComponent, CarouselProductsComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  productsService = inject(ProductsService);
  destroyRef = inject(DestroyRef);


  // Cambia el tipo de 'products' a 'Product[]' ya que la respuesta es un array de productos
  products: Products = {};
  productsTechnology: Products = {};


  ngOnInit(): void {
    // Usar forkJoin para hacer ambas solicitudes de forma paralela
    forkJoin([
      this.getAllProducts(),
      this.getAllProductsTechnology()
    ]).subscribe();

    // Usamos setTimeout para ejecutar la función después de 3 segundos
    window.HSStaticMethods.autoInit()
  }


  private getAllProducts(): Observable<any> {
    return this.productsService.getAllProducts()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        distinctUntilChanged(),
        tap((allProducts) => this.products = allProducts)
      )
  }

  private getAllProductsTechnology(): Observable<any> {
    return this.productsService.getAllProductsTechnology()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        distinctUntilChanged(),
        tap((techProducts) => this.productsTechnology = techProducts)
      )
  }
}


