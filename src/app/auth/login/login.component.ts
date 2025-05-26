import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { FormUtils } from '@shared/utils/form.utils';
import { ErrorFormComponent } from '@shared/components/errorForm/errorForm.component';
import { FunctionUtils } from '@shared/utils/function.utils';
import { UserService } from '@store/services/user.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule, ErrorFormComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);  // <-- inyectar aquí correctamente
  userService = inject(UserService);
  formUtils = FormUtils;
  functionUtils = FunctionUtils;
  showPassword: boolean = false;

  returnUrl: string = '/';  // variable para guardar returnUrl

  myForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor() {
    // Capturar returnUrl en constructor o ngOnInit
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
    if (this.myForm.invalid) return;

    const { username, password } = this.myForm.value;

    this.authService.login(username!, password!).subscribe({
      next: (usuario) => {
        // login OK
        this.authService.loginStorage(usuario);
        this.userService.reloadUser();
        this.goToHome();
        this.authService.isLoggedIn.set(true);

      },
      error: (err) => {
        this.myForm.setErrors({ invalidCredentials: true });
      }
    });
  }

  goToHome(): void {
    this.router.navigateByUrl(this.returnUrl);
  }
}
