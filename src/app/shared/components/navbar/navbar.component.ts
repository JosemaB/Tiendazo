import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { ProductsService } from '@store/services/products.service';
import { Products } from '@store/interfaces/product.interface';
import { AuthService } from '@auth/services/auth.service';
import { BuscadorNavComponent } from './components/buscadorNav/buscadorNav.component';
import { ModalCartComponent } from "./components/modalCart/modalCart.component";
import { UserService } from '@store/services/user.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-navbar',
  imports: [BuscadorNavComponent, RouterModule, MatBadgeModule, MatButtonModule, MatIconModule, ModalCartComponent],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements AfterViewInit {
  router = inject(Router);
  productsService = inject(ProductsService);
  authService = inject(AuthService);
  userService = inject(UserService);
  @ViewChild('searchInput') searchInput!: ElementRef;
  products: Products = {};
  showResults = false;
  hidden = false;
  isMobile = false;
  isAdmin = false;
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
  goToCategorie(categorie: string): void {
    this.router.navigate(['/categorie', categorie]);
  }
  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }
  ngOnInit(): void {
    const userId = this.userService.user().id?.toString();

    this.userService.getSearchUserID(userId!)
      .pipe(
        map(user => {
          this.isAdmin = user?.role === 'admin' ? true : false;
        })
      ).subscribe();
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
        if (value) {
          this.productsService.getSearchProduct(value).subscribe({
            next: (products) => {
              this.showResults = true;
              this.products = products;
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

  totalProducts(): number {
    let totalProducts = 0;
    this.productsService.productsCart().forEach(product => {
      totalProducts += product.quantity;
    });
    return totalProducts;
  }
  closeDrawer() {
    const closeBtn = document.getElementById('dropdown-scrollable');
    if (closeBtn) {
      (closeBtn as HTMLElement).click();
    }
  }
}
