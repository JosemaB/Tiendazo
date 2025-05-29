import { Routes } from '@angular/router';
import { DetailsUserComponent } from './components/all-users/components/detailsUser/detailsUser.component';
import { AdminComponent } from './admin.component';
import { DetailProductAdminComponent } from './components/all-products/components/detailProductAdmin/detailProductAdmin.component';

export const adminRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: AdminComponent,
      },
      {
        path: 'userDetail/:id',
        component: DetailsUserComponent,
      },
      {
        path: 'productDetail/:id',
        component: DetailProductAdminComponent,
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
];

export default adminRoutes;
