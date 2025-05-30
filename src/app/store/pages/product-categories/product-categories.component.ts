import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SectionTitleComponentComponent } from '@shared/components/SectionTitleComponent/SectionTitleComponent.component';
import { productCardComponent } from '@store/components/card/productCard.component';
import { Product } from '@store/interfaces/product.interface';
import { ProductsService } from '@store/services/products.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-product-categories',
  imports: [productCardComponent, SectionTitleComponentComponent],
  templateUrl: './product-categories.component.html',
})
export class ProductCategoriesComponent {

  route = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  products: Product[] = [];
  categories: string[] = [];
  categorie: string = '';
  loading = false;
  ngOnInit(): void {
    //Route
    this.route.params.subscribe(params => {
      this.categorie = params['categorie'] ?? '';
      this.products = [];
      if (['men', 'women', 'home', 'shoes', 'technology'].includes(this.categorie)) {
        switch (this.categorie) {
          case 'men':
            this.categories =
              ["mens-shirts",
                "mens-shoes",
                "mens-watches"];
            break;
          case 'women':
            this.categories = [
              "womens-bags",
              "womens-dresses",
              "womens-jewellery",
              "womens-shoes",
              "womens-watches",
              "tops"
            ];
            break;
          case 'home':
            this.categories = [
              "home-decoration",
              "kitchen-accessories",
              "groceries"
            ];
            break;
          case 'shoes':
            this.categories =
              [
                "mens-shoes",
                "womens-shoes"
              ];
            break;
          case 'technology':
            this.categories =
              [
                "laptops",
                "smartphones",
                "tablets",
                "mobile-accessories"
              ];
            break;
        }
      } else {
        this.categories = [this.categorie];
      }

      const requests = this.categories.map(cat =>
        this.productsService.getCategoryProducts(cat)
      );

      forkJoin(requests).subscribe({
        next: (responses) => {
          let allProducts = responses.flatMap(res => res?.products || []);
          if (allProducts.length === 0) {
            this.productsService.getCategoryProducts('categorie').subscribe({
              next: (res) => {
                this.products = res.products || [];
                this.loading = true;
                window.scrollTo(0, 0);
              },
              error: (err) => {
                console.error('Error al cargar todos los productos:', err);
                this.loading = true;
              }
            });
          } else {
            this.products = allProducts;
            window.scrollTo(0, 0);

            this.loading = true;
          }
        },
        error: (error) => {
          console.error('Error al cargar productos por categorías:', error);
        }
      });



    });
  }

  getTitleCategory(): string {
    switch (this.categorie) {

      // WOMEN
      case 'women':
      case 'womens-bags':
      case 'womens-dresses':
      case 'womens-jewellery':
      case 'womens-watches':
        return 'Descubre lo Mejor en Moda Femenina';

      // MEN
      case 'men':
      case 'mens-shirts':
      case 'mens-watches':
        return 'Estilo Masculino para Cada Ocasión';

      // HOME
      case 'home':
      case 'home-decoration':
      case 'kitchen-accessories':
        return 'Inspiración para Tu Hogar';

      // SHOES
      case 'mens-shoes':
      case 'womens-shoes':
      case 'shoes':
        return 'Zapatos que Marcan Tendencia';

      // TECHNOLOGY
      case 'technology':
      case 'laptops':
      case 'smartphones':
      case 'tablets':
      case 'mobile-accessories':
        return 'Tecnología de Última Generación';

      // OTHER
      case 'beauty':
      case 'skin-care':
        return 'Belleza y Cuidado Personal';

      case 'fragrances':
        return 'Perfumes que Dejan Huella';

      case 'groceries':
        return 'Tus Compras del Día a un Click';

      case 'vehicle':
        return 'Muévete con Estilo';

      case 'motorcycle':
        return 'Pasión por las Dos Ruedas';

      case 'sports-accessories':
        return 'Equipate para Superar tus Límites';

      case 'sunglasses':
        return 'Protegé tu Mirada con Estilo';

      default:
        return 'Explorá Nuestros Productos';
    }
  }
}
