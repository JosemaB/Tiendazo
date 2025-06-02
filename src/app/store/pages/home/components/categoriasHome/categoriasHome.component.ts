import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'categorias-home',
  imports: [],
  templateUrl: './categoriasHome.component.html',
  styleUrl: './categoriasHome.component.css',

})
export class CategoriasHomeComponent {
  router = inject(Router);

  goToCategorie(categorie: string): void {
    this.router.navigate(['/categorie', categorie]);
  }
}
