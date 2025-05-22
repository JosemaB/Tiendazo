import { Routes } from '@angular/router';
import { HomeComponent } from './store/pages/home/home.component';
import { DetailsProductComponent } from './store/pages/detailsProduct/detailsProduct.component';
import { ProductCategoriesComponent } from './store/pages/product-categories/product-categories.component';
import { MainLayoutComponent } from './layout/mainLayout/mainLayout.component';
import { NotAuthenticatedGuard } from '@auth/guards/not-authenticated.guard';
import { ProductsSearchComponent } from './store/pages/products-search/products-search.component';
import { ShoppingCartComponentComponent } from './store/pages/ShoppingCartComponent/ShoppingCartComponent.component';
import { NotAuthenticatedCartGuard } from '@auth/guards/not-authenticatedCart.guard';
import { PerfilComponent } from './store/pages/Perfil/Perfil.component';
import { AjustesUsuarioComponent } from './store/pages/AjustesUsuario/AjustesUsuario.component';


export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige la ruta raíz a '/home'
      { path: 'home', component: HomeComponent },
      { path: 'product/:id', component: DetailsProductComponent },
      { path: 'categorie/:categorie', component: ProductCategoriesComponent },
      { path: 'searchProducts/:name', component: ProductsSearchComponent },
      {
        path: 'shopping', component: ShoppingCartComponentComponent,
        canMatch: [NotAuthenticatedCartGuard]
      },
      { path: 'perfil', component: PerfilComponent },
      { path: 'ajustes', component: AjustesUsuarioComponent },

    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    canMatch: [
      NotAuthenticatedGuard,
    ],
  },
  {
    path: '**',
    redirectTo: ''
  }
];
