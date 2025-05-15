import { Routes } from '@angular/router';
import { HomeComponent } from './store/pages/home/home.component';
import { DetailsProductComponent } from './store/pages/detailsProduct/detailsProduct.component';
import { ProductCategoriesComponent } from './store/pages/product-categories/product-categories.component';
import { MainLayoutComponent } from './layout/mainLayout/mainLayout.component';
import { NotAuthenticatedGuard } from '@auth/guards/not-authenticated.guard';
import { ProductsSearchComponent } from './store/pages/products-search/products-search.component';


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
