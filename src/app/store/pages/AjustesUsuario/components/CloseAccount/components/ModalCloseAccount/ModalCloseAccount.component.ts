import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../../../../../../auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-close-account',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './ModalCloseAccount.component.html',
  styleUrl: './ModalCloseAccount.component.css',

})
export class ModalCloseAccountComponent {
  authService = inject(AuthService);
  toastr = inject(ToastrService);
  showSecondStep = false;
  secondsRemaining = 5;
  private intervalId?: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.secondsRemaining--;

      if (this.secondsRemaining <= 0) {
        this.showSecondStep = true;
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  cerrarCuena() {
    this.authService.logout();
    this.toastr.success('La cuenta se ha eliminado correctamente', 'Cuenta eliminada', {
      positionClass: 'toast-bottom-right',
    });
  }
}
