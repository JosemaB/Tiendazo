import { Routes } from '@angular/router';
import { HomeComponent } from './store/pages/home/home.component';
import { DetailsProductComponent } from './store/pages/detailsProduct/detailsProduct/detailsProduct.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'product/:id',
    component: DetailsProductComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
