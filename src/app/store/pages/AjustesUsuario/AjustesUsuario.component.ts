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
    SecurityAndPrivacyComponent
  ],
  templateUrl: './AjustesUsuario.component.html',
  styleUrl: './AjustesUsuario.component.css',

})
export class AjustesUsuarioComponent {
  contenidoActual: string = 'perfil';
  isMobile = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }
  onMenuClick(opcion: string, drawer: MatSidenav) {
    this.contenidoActual = opcion;
    if (this.isMobile) {
      drawer.close();
    }
  }
}
