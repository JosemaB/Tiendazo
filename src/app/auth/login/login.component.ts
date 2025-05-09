import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '@shared/utils/form.utils';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {

  fb = inject(FormBuilder);
  formUtils = FormUtils;
  authService = inject(AuthService);

  myForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    this.myForm.markAllAsTouched();
    if (this.myForm.invalid) return;
    const { email, password } = this.myForm.value;

    this.authService.login(email!, password!).subscribe({
      next: (res) => {
        // login OK
      },
      error: (err) => {
        // Aquí puedes marcar un error al formulario
        this.myForm.setErrors({ invalidCredentials: true });
      }
    })

    console.log(this.myForm.value);

  }
}
