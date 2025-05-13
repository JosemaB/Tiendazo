import { RouterModule } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { FormUtils } from '@shared/utils/form.utils';
import { ErrorFormComponent } from '@shared/components/errorForm/errorForm.component';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule, ErrorFormComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  formUtils = FormUtils;
  authService = inject(AuthService);
  showPassword: boolean = false;

  myForm = this.fb.group(
    {
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    }
  );

  onSubmit() {
    this.myForm.markAllAsTouched();
    if (this.myForm.invalid) return;

    const { username, password } = this.myForm.value;

    this.authService.login(username!, password!).subscribe({
      next: (usuario) => {
        // login OK
        this.login(usuario);
      },
      error: (err) => {
        // Aquí puedes marcar un error al formulario
        this.myForm.setErrors({ invalidCredentials: true });
      }
    })
  }

  login(usuario: any) {
    localStorage.setItem("accessToken", usuario.accessToken);
    localStorage.setItem("refreshToken", usuario.refreshToken);
    localStorage.setItem("user", JSON.stringify({
      id: usuario.id,
      username: usuario.username,
      email: usuario.email,
      firstName: usuario.firstName,
      lastName: usuario.lastName,
      gender: usuario.gender,
      image: usuario.image
    }));

  }
}
