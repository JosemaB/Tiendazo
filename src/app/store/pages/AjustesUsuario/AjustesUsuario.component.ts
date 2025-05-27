import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { ChangeAvatarComponentComponent } from './components/changeAvatarComponent/changeAvatarComponent.component';
import { CloseAccountComponent } from "./components/CloseAccount/CloseAccount.component";
import { HelpCenterComponent } from "./components/helpCenter/helpCenter.component";
import { PerfilFormComponent } from "./components/perfilForm/perfilForm.component";
import { SecurityAndPrivacyComponent } from "./components/SecurityAndPrivacy/SecurityAndPrivacy.component";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-root',
  imports: [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    ChangeAvatarComponentComponent,
    CloseAccountComponent,
    HelpCenterComponent,
    PerfilFormComponent,
    SecurityAndPrivacyComponent,
    MatTabsModule
  ],
  templateUrl: './AjustesUsuario.component.html',
  styleUrl: './AjustesUsuario.component.css',

})
export class AjustesUsuarioComponent {
  contenidoActual: string = 'perfil';
  selectedTabIndex = 0;
  isMobile = false;
  tabMap: { [key: string]: number } = {
    perfil: 0,
    avatar: 1,
    seguridad: 2,
    contacto: 3,
    cerrarCuenta: 4
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
