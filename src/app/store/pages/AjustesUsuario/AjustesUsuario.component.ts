import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ChangeAvatarComponentComponent } from './components/changeAvatarComponent/changeAvatarComponent.component';

@Component({
  selector: 'app-root',
  imports: [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    ChangeAvatarComponentComponent
  ],
  templateUrl: './AjustesUsuario.component.html',
  styleUrl: './AjustesUsuario.component.css',

})
export class AjustesUsuarioComponent {
  contenidoActual: string = 'perfil';
}
