import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Products } from '@store/interfaces/product.interface';
import { ProductsService } from '@store/services/products.service';
import { productCardComponent } from "@store/components/card/productCard.component";
import { CarouselMainComponent } from "@store/components/carouselMain/carouselMain/carouselMain.component";
import { CarouselProductsComponent } from "@shared/components/CarouselProducts/CarouselProducts.component";
import { distinctUntilChanged, forkJoin, Observable, tap } from 'rxjs';
import { SectionTitleComponentComponent } from "@shared/components/SectionTitleComponent/SectionTitleComponent.component";

@Component({
  selector: 'app-home',
  imports: [productCardComponent, CarouselMainComponent, CarouselProductsComponent, SectionTitleComponentComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  productsService = inject(ProductsService);
  destroyRef = inject(DestroyRef);



  products: Products = {};
  productsPage2: Products = {};
  productsLaptops: Products = {};
  productsSport: Products = {};

  ngOnInit(): void {

    forkJoin([
      this.getAllProducts(),
      this.getAllProducts(5),
      this.getProductsLaptops(),
      this.getProductsSports()
    ]).subscribe();


    window.HSStaticMethods.autoInit()
  }


  private getAllProducts(page = 1): Observable<any> {
    return this.productsService.getAllProducts(page)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        distinctUntilChanged(),
        tap((allProducts) => {
          if (page === 1) {
            this.products = allProducts
          } else {
            this.productsPage2 = allProducts
          }
        })
      )
  }

  private getProductsLaptops(): Observable<any> {
    return this.productsService.getCategoryProducts('laptops')
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        distinctUntilChanged(),
        tap((laptopsProducts) => this.productsLaptops = laptopsProducts)
      )
  }

  private getProductsSports(): Observable<any> {

    return this.productsService.getCategoryProducts('sports-accessories')
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        distinctUntilChanged(),
        tap((sportProducts) => this.productsSport = sportProducts)
      )
  }
}


