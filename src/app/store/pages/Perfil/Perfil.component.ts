import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { productCardComponent } from '@store/components/card/productCard.component';
import { LoginUser } from '@store/interfaces/loginUser.interface';
import { Product } from '@store/interfaces/product.interface';
import { CartProduct } from '@store/interfaces/productCart.interface';
import { CardProductHistoryComponent } from "./components/cardProductHistory/cardProductHistory.component";

@Component({
  selector: 'app-perfil',
  imports: [MatTabsModule, productCardComponent, RouterModule, CardProductHistoryComponent],
  templateUrl: './Perfil.component.html',
  styleUrl: './Perfil.component.css',

})
export class PerfilComponent {
  user: LoginUser = (JSON.parse(localStorage.getItem('user') || ''));
  productsWishlist: Product[] = JSON.parse(localStorage.getItem('wishlist') || '[]');
  productHistory: CartProduct[] = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');

}
