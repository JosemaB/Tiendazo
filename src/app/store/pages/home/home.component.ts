import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Products } from '../../interfaces/product.interface';
import { ProductsService } from '../../services/products.service';
import { productCardComponent } from "../../components/card/productCard.component";
import { CarouselMainComponent } from "../../components/carouselMain/carouselMain/carouselMain.component";

@Component({
  selector: 'app-home',
  imports: [productCardComponent, CarouselMainComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  productsService = inject(ProductsService);
  productsResponse = toSignal<Products>(this.productsService.getAllProducts());

  products = computed(() => {
    const response = this.productsResponse();
    console.log('Productos:', response?.products); // Aquí logueamos los productos
    return response ? response.products : [];
  });


  // Añade esto a la clase ProductCarouselComponent
  scrollCarousel(direction: 'left' | 'right') {
    const container = document.getElementById('product-carousel');
    if (container) {
      const scrollAmount = 300; // Ajusta este valor según necesites
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  }
}


