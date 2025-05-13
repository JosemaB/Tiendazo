import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { ProductsService } from '@store/services/products.service';
import { Products } from '@store/interfaces/product.interface';
import { AuthService } from '@auth/services/auth.service';
import { BuscadorNavComponent } from './components/buscadorNav/buscadorNav.component';
import { LoginUser } from '@store/interfaces/loginUser.interface';
@Component({
  selector: 'app-navbar',
  imports: [BuscadorNavComponent, RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('searchInput') searchInput!: ElementRef;
  router = inject(Router);
  productsService = inject(ProductsService);
  authService = inject(AuthService);
  products: Products = {};
  showResults = false;
  user: LoginUser = {};

  goToCategorie(categorie: string): void {
    this.router.navigate(['/categorie', categorie]);
  }
  ngOnInit(): void {
    this.user = this.authService.getUserInfo();
  }
  ngAfterViewInit() {

    const inputElement = this.searchInput.nativeElement;
    fromEvent(inputElement, 'input')
      .pipe(
        map(() => inputElement.value),
        // Wait 3 second
        debounceTime(500)
      )
      .subscribe((value) => {
        console.log(value + "sadasd");
        if (value) {
          this.productsService.getSearchProduct(value).subscribe({
            next: (products) => {
              this.showResults = true;
              this.products = products;
              console.log(products);
            },
            error: (error) => {
              console.error('Error getting related products:', error);

            }
          });
        } else {
          this.showResults = false;
        }
      });

  }
  onFocus(value: string) {
    this.showResults = value.trim().length > 0;
  }
  onBlur() {
    setTimeout(() => {
      this.showResults = false;
    }, 150);
  }

}
