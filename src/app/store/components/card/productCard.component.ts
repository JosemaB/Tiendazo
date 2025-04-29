import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'product-card',
  imports: [],
  templateUrl: './productCard.component.html'
})
export class productCardComponent {

  @Input() urlProduct: number = 0;
  @Input() title: string = '';
  @Input() img: string = '';
  @Input() alt_img: string = '';

  @Input() price: number = 0;
  @Input() rating: number = 0;

  router = inject(Router);
  sanitizer = inject(DomSanitizer);

  getRatingStars(rating: number): SafeHtml {
    const fullStars = Math.ceil(rating);
    const emptyStars = 5 - fullStars;

    const fullStarSVG = `<svg class="w-4 h-4 text-yellow-300" aria-hidden="true" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>`;

    const emptyStarSVG = `<svg class="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>`;

    return this.sanitizer.bypassSecurityTrustHtml(fullStarSVG.repeat(fullStars) + emptyStarSVG.repeat(emptyStars));
  }

  goToProduct(id: number): void {
    this.router.navigate(['/product', id]);
  }

}
