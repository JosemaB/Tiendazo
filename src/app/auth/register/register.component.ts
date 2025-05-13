import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { ErrorFormComponent } from '@shared/components/errorForm/errorForm.component';
import { FormUtils } from '@shared/utils/form.utils';

@Component({
  selector: 'app-register',
  imports: [RouterModule, ErrorFormComponent, ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {

  fb = inject(FormBuilder);
  formUtils = FormUtils;
  authService = inject(AuthService);
  showPassword1: boolean = false;
  showPassword2: boolean = false;

  myForm = this.fb.group(
    {
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    }
  );

  onSubmit() {

  }
}
