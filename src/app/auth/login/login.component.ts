import { RouterModule } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '@shared/utils/form.utils';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  formUtils = FormUtils;
  authService = inject(AuthService);

  myForm = this.fb.group({
    username: ['', [Validators.required], [FormUtils.usernameExists(this.authService)]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    this.myForm.markAllAsTouched();
    if (this.myForm.invalid) return;

    const { username, password } = this.myForm.value;

    this.authService.login(username!, password!).subscribe({
      next: (res) => {
        // login OK
        console.log("Login con exito");
      },
      error: (err) => {
        // Aquí puedes marcar un error al formulario
        this.myForm.setErrors({ invalidCredentials: true });
      }
    })
  }
}
