import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { ErrorFormComponent } from '@shared/components/errorForm/errorForm.component';
import { SectionTitleComponentComponent } from '@shared/components/SectionTitleComponent/SectionTitleComponent.component';
import { FormUtils } from '@shared/utils/form.utils';
import { UserService } from '@store/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'perfil-form',
  imports: [ReactiveFormsModule, SectionTitleComponentComponent, ErrorFormComponent],
  templateUrl: './perfilForm.component.html',
})
export class PerfilFormComponent {
  toastr = inject(ToastrService);
  userService = inject(UserService);
  authService = inject(AuthService);
  formUtils = FormUtils;
  mensajeEnvido = false;
  currentEmail = this.userService.user().email;
  currentUsername = this.userService.user().username;

  fb = inject(FormBuilder);
  myForm = this.fb.group({
    email: [this.currentEmail, [Validators.required, Validators.email, Validators.pattern(FormUtils.emailPattern)],
    [FormUtils.emailExists(this.authService, this.currentEmail)]],
    username: [this.currentUsername, [Validators.required], [FormUtils.usernameExists(this.authService, this.currentUsername)]],
    biography: [this.userService.user().biography],
  });
  onSubmit() {
    this.myForm.markAllAsTouched();

    if (this.myForm.invalid) return;

    this.toastr.success('Los datos se han guardado correctamente', 'Perfil actualizado', {
      positionClass: 'toast-bottom-right',
    });
    this.mensajeEnvido = true;
    const { email, username, biography } = this.myForm.value;

    this.userService.updateUserPerfil(username!, email!, biography!);
  }
}


