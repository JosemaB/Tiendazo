import { Component, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '@store/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TauiToastService } from '@ngx-tailwind-ui/toast';
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

  avatarSeleccionado: string | null = this.userService.user()?.image || '';
  avatares: string[] = [
    "assets/images/avatares/Cuphead.jpg",
    "assets/images/avatares/dark_souls.jpg",
    "assets/images/avatares/elden-ring.webp",
    "assets/images/avatares/hollow_knight.jpg",
    "assets/images/avatares/luffy.jpg",
    "assets/images/avatares/morgana.jpg",
    "assets/images/avatares/persona3.jpg",
    "assets/images/avatares/persona4.jpg",
    "assets/images/avatares/sora.png",
    "assets/images/avatares/stardew_valley.png",
    "assets/images/avatares/wukong.jpg",
    "assets/images/avatares/Yoshi.jpg"
  ];

  seleccionarAvatar(avatar: string) {
    this.avatarSeleccionado = avatar;
  }
  toast = inject(TauiToastService);


  avatarSelecionado() {

    this.toastr.success('Hello world!', 'Toastr fun!', {
      positionClass: 'toast-bottom-right'
    });


  }

}
