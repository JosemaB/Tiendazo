import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, Products } from '@store/interfaces/product.interface';
import { ProductsService } from '@store/services/products.service';
import { CarouselComponentTripleImg } from "@shared/components/carousel/carousel.component";
import { SectionTitleComponentComponent } from '@shared/components/SectionTitleComponent/SectionTitleComponent.component';
import { StringUtils } from '@shared/utils/string.utils';
import { CarouselProductsComponent } from "@shared/components/CarouselProducts/CarouselProducts.component";
import { ReviewsProductComponent } from '@store/components/reviewsProduct/reviewsProduct/reviewsProduct.component';

@Component({
  selector: 'details-product',
  imports: [CarouselComponentTripleImg, SectionTitleComponentComponent, CarouselProductsComponent, ReviewsProductComponent],
  templateUrl: './detailsProduct.component.html',
})
export class DetailsProductComponent implements OnInit {
  productId: string = '';
  product: Product = {};
  productsRelated: Products = {};
  route = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  stringUtils = inject(StringUtils);

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id') ?? '';
    this.productsService.getProduct(this.productId).subscribe({
      next: (product) => {
        this.product = product;
        console.log('Producto recibido:', product);

        // Cargar los detalles del producto cuando el ID cambie
        this.loadProductDetails();
      },
      error: (error) => {
        console.error('Error getting product:', error);
      }
    });

    // Suscribirse a los parámetros de la ruta
    this.route.params.subscribe(params => {
      this.productId = params['id']; // Obtenemos el nuevo ID
      console.log('ID del producto cambiado:', this.productId);

      // Cargar el producto con el nuevo ID
      this.loadProductDetails();
    });

  }
  loadProductDetails() {
    // Aquí puedes cargar el producto desde tu servicio
    this.productsService.getProduct(this.productId).subscribe(product => {
      this.product = product;
      window.scrollTo(0, window.scrollY);
      //Second request for related products
      this.productsService.getCategoryProducts(this.product.category!).subscribe({
        next: (relatedRes) => {
          this.productsRelated.products = relatedRes.products?.filter(p => p.id !== this.product.id);
        },
        error: (error) => {
          console.error('Error getting related products:', error);
        }
      });

      console.log('Producto cargado:', product);
    });
  }
}
