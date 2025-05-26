import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'help-center',
  imports: [],
  templateUrl: './helpCenter.component.html',
})
export class HelpCenterComponent {
  toastr = inject(ToastrService);
  mensajeEnvido = false;
  onSubmit() {
    this.toastr.success('El mensaje se ha enviado a soporte correctamente', 'Mensaje enviado', {
      positionClass: 'toast-bottom-right',
    });
    this.mensajeEnvido = true;
  }

}
