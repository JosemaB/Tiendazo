import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { ErrorFormComponent } from '@shared/components/errorForm/errorForm.component';
import { FormUtils } from '@shared/utils/form.utils';
import { FunctionUtils } from '@shared/utils/function.utils';


@Component({
  selector: 'app-register',
  imports: [RouterModule, ErrorFormComponent, ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {

  fb = inject(FormBuilder);
  router = inject(Router);
  formUtils = FormUtils;
  authService = inject(AuthService);
  functionUtils = FunctionUtils;
  showPassword1: boolean = false;
  showPassword2: boolean = false;

  myForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email, Validators.pattern(FormUtils.emailPattern)],
        [FormUtils.emailExists(this.authService)]],
      username: ['', [Validators.required], [FormUtils.usernameExists(this.authService)]],
      password: ['', [Validators.required, Validators.pattern(FormUtils.passwordPattern)]],
      password2: ['', [Validators.required]],
    },
    {
      validators: [FormUtils.isFieldOneEqualFieldTwo('password', 'password2')]
    }
  );

  onSubmit() {
    this.myForm.markAllAsTouched();
    if (this.myForm.invalid) return;
    const { email, username, password } = this.myForm.value;

    const user = {
      "username": username,
      "password": password,
      "email": email,
      "accessToken": this.functionUtils.generateFakeToken(username!)
    }
    this.authService.register(user);
    this.authService.loginStorage(user);
    this.goToHome();
    this.authService.isLoggedIn.set(true);
  }
  goToHome(): void {
    this.router.navigate(['/home']);
  }
}
