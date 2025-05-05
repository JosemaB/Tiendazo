import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StringUtils } from '@shared/utils/string.utils';

@Component({
  selector: 'product-card',
  imports: [],
  templateUrl: './productCard.component.html'
})
export class productCardComponent {

  @Input() urlProduct: number | undefined = 7;
  @Input() title: string | undefined = '';
  @Input() img: string[] | undefined = [];
  @Input() alt_img: string | undefined = '';

  @Input() price: number | undefined = 0;
  @Input() rating: number | undefined = 0;

  router = inject(Router);
  utilsString = inject(StringUtils);

  goToProduct(id: number): void {
    console.log('Click en producto ID:', id);
    this.router.navigate(['/product', id]); // Esto es lo correcto
  }


}
