import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { ResumenComponent } from './components/resumen/resumen.component';
import { AllCartsComponent } from "./components/all-carts/all-carts.component";
import { AllUsersComponent } from "./components/all-users/all-users.component";
import { AllProductsComponent } from "./components/all-products/all-products.component";
import { AllCommentsComponent } from "./components/all-comments/all-comments.component";

@Component({
  selector: 'app-admin',
  imports: [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTabsModule,
    ResumenComponent,
    AllCartsComponent,
    AllUsersComponent,
    AllProductsComponent,
    AllCommentsComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  contenidoActual: string = 'dashboard';
  selectedTabIndex = 0;
  isMobile = false;
  tabMap: { [key: string]: number } = {
    dashboard: 0,
    usuarios: 1,
    products: 2,
    comments: 3,
    carts: 4
  };

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }
  onTabChange(index: number) {
    const reverseMap = Object.entries(this.tabMap).find(([key, value]) => value === index);
    this.contenidoActual = reverseMap?.[0] || 'perfil';
  }

  onMenuClick(opcion: string, drawer: MatSidenav) {
    this.contenidoActual = opcion;
    this.selectedTabIndex = this.tabMap[opcion] || 0;
    if (this.isMobile) {
      drawer.close();
    }
  }
}
