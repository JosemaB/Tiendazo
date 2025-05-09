import { Routes } from '@angular/router';
import { HomeComponent } from './store/pages/home/home.component';
import { DetailsProductComponent } from './store/pages/detailsProduct/detailsProduct.component';
import { ProductCategoriesComponent } from './store/pages/product-categories/product-categories.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
  },
  {
    path: 'product/:id',
    component: DetailsProductComponent
  },
  {
    path: 'categorie/:categorie',
    component: ProductCategoriesComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
