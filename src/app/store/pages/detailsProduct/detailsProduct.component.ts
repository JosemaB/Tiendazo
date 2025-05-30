import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, Products } from '@store/interfaces/product.interface';
import { ProductsService } from '@store/services/products.service';
import { CarouselComponentTripleImg } from "@shared/components/carousel/carousel.component";
import { SectionTitleComponentComponent } from '@shared/components/SectionTitleComponent/SectionTitleComponent.component';
import { StringUtils } from '@shared/utils/string.utils';
import { CarouselProductsComponent } from "@shared/components/CarouselProducts/CarouselProducts.component";
import { ReviewsProductComponent } from '@store/components/reviewsProduct/reviewsProduct.component';
import { CartProduct } from '@store/interfaces/productCart.interface';
import { MatDialog } from '@angular/material/dialog';
import { ModalCommentProductComponent } from './components/modalCommentProduct/modalCommentProduct.component';

@Component({
  selector: 'details-product',
  imports: [CarouselComponentTripleImg, SectionTitleComponentComponent, CarouselProductsComponent, ReviewsProductComponent],
  templateUrl: './detailsProduct.component.html',
})
export class DetailsProductComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  dialog = inject(MatDialog);
  productsService = inject(ProductsService);
  stringUtils = inject(StringUtils);
  productsRelated: Products = { products: [] };
  product: Product = {};
  productId: string = '';
  loading = false;

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id') ?? '';
    this.loading = false; // Empieza la carga
    this.productsService.getProduct(this.productId).subscribe({
      next: (product) => {
        this.product = product;
        this.loadProductDetails(); // Aquí carga relacionados también
      },
      error: (error) => {
        console.error('Error getting product:', error);
        this.loading = true; // Fin carga pero sin producto válido
      }
    });

    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.loading = false;
      this.loadProductDetails();
    });
  }

  loadProductDetails() {
    this.productsService.getProduct(this.productId).subscribe(product => {
      this.product = product;
      window.scrollTo(0, 0);

      this.productsService.getCategoryProducts(this.product.category!).subscribe({
        next: (relatedRes) => {
          this.productsRelated.products = relatedRes.products?.filter(p => p.id !== this.product.id);
          this.loading = true;  // ¡Aquí ya terminó la carga completa!

          // Esperamos un pequeño delay para que el DOM termine de actualizarse
          setTimeout(() => {
            if (typeof window !== 'undefined' && window.HSStaticMethods) {
              window.HSStaticMethods.autoInit();
            }
          }, 100);
        },
        error: (error) => {
          console.error('Error getting related products:', error);
          this.loading = true;  // Termina carga aunque sin relacionados
        }
      });
    });
  }


  addProduct() {
    const product: CartProduct = {
      id: this.product.id?.toString()!,
      name: this.product.title!,
      price: this.product.price!,
      quantity: 1,
      image: this.product?.images?.[0] ?? ''
    }
    this.openDrawer();
    this.productsService.addCartStorage(product);
  }
  comprarProducto() {
    const product: CartProduct = {
      id: this.product.id?.toString()!,
      name: this.product.title!,
      price: this.product.price!,
      quantity: 1,
      image: this.product?.images?.[0] ?? ''
    }
    this.productsService.addCartStorage(product);
    this.router.navigate(['/shopping']);
  }

  openDrawer() {
    const openBtn = document.querySelector('button[data-overlay="#overlay-end-example"][aria-haspopup="dialog"]');
    if (openBtn) {
      (openBtn as HTMLElement).click();
    }
  }

  openMessageModal(): void {
    this.dialog.open(ModalCommentProductComponent, {
      width: '500px',
      data: { producto: this.productId }

    });
  }
}
