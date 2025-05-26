import { Component, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '@store/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'dialog-animations-example-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog-animations-example-dialog.component.html',
  styleUrl: './dialog-animations-example-dialog.component.css',
})
export class DialogAnimationsExampleDialogComponent {
  userService = inject(UserService);
  snackBar = inject(MatSnackBar);
  toastr = inject(ToastrService);

  avatares: string[] = [
    "assets/images/avatares/Avatar1.png",
    "assets/images/avatares/Avatar2.png",
    "assets/images/avatares/Avatar3.png",
    "assets/images/avatares/Avatar4.png",
    "assets/images/avatares/Avatar5.png",
    "assets/images/avatares/Avatar6.png",
    "assets/images/avatares/Avatar7.png",
    "assets/images/avatares/Avatar8.png",
    "assets/images/avatares/Avatar9.png",
    "assets/images/avatares/Avatar10.png",
    "assets/images/avatares/Avatar11.png",
    "assets/images/avatares/Avatar12.png"
  ];

  avatarSeleccionado: string = this.avatares.includes(this.userService.user()?.image || '')
    ? this.userService.user()?.image!
    : '';

  seleccionarAvatar(avatar: string) {
    this.avatarSeleccionado = avatar;
  }

  avatarSelecionado() {
    this.toastr.success('El avatar se actualizó con éxito', 'Actualización completa', {
      positionClass: 'toast-bottom-right',
    });
    this.userService.changeAvatar(this.avatarSeleccionado);
  }

}
