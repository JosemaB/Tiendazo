import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  imports: [
    MatSidenavModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './AjustesUsuario.component.html',
})
export class AjustesUsuarioComponent {
  contenidoActual: string = 'inicio';
}
