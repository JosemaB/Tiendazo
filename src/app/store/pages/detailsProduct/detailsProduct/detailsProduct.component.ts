import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@store/interfaces/product.interface';
import { ProductsService } from '@store/services/products.service';
import { CarouselComponentTripleImg } from "@shared/components/carousel/carousel.component";
import { SectionTitleComponentComponent } from '@shared/components/SectionTitleComponent/SectionTitleComponent.component';

@Component({
  selector: 'details-product',
  imports: [CarouselComponentTripleImg, SectionTitleComponentComponent],
  templateUrl: './detailsProduct.component.html',
})
export class DetailsProductComponent implements OnInit {
  productId: string = '';
  product: Product = {};
  route = inject(ActivatedRoute);
  productsService = inject(ProductsService);

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id') ?? '';
    this.productsService.getProduct(this.productId).subscribe({
      next: (product) => {
        this.product = product;
        console.log('Producto recibido:', product);
      },
      error: (error) => {
        console.error('Error al obtener el producto:', error);
      }
    });
  }

}
