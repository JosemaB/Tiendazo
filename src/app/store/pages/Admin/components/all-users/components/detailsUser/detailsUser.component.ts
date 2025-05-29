import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ErrorFormComponent } from '@shared/components/errorForm/errorForm.component';
import { FormUtils } from '@shared/utils/form.utils';
import { User } from '@store/interfaces/user.interface';
import { UserService } from '@store/services/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-details-user',
  imports: [CommonModule, ReactiveFormsModule, ErrorFormComponent],
  templateUrl: './detailsUser.component.html',
})
export class DetailsUserComponent {
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  toastr = inject(ToastrService);
  userService = inject(UserService);
  allRoles: string[] = ['admin', 'user', 'moderator'];
  myForm!: ReturnType<FormBuilder['group']>;
  formUtils = FormUtils;
  user: User = {};
  userNotFound = false;
  isSaving = false;

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');

    this.userService.getSearchUserID(userId!).subscribe({
      next: (response: User) => {
        this.user = response;
        this.initForm();
      },
      error: (err) => {
        this.userNotFound = true;
        console.error('Error al cargar el usuario:', err);
      }
    })
  }
  initForm() {
    this.myForm = this.fb.group({
      username: [this.user.username, [Validators.required, Validators.pattern(FormUtils.textPattern)]],
      email: [this.user.email, [Validators.required, Validators.email, Validators.pattern(FormUtils.emailPattern)]],
      phone: [this.user.phone, [Validators.required, Validators.pattern(FormUtils.phoneNumberPattern)]],
      rol: [this.user.role, [Validators.required]],
    });
  }

  get orderedRoles(): string[] {
    return [
      this.user.role!,
      ...this.allRoles.filter(r => r !== this.user.role)
    ];
  }
  get usernameControl() {
    return this.myForm?.get('username');
  }

  saveUser() {
    this.myForm.markAllAsTouched();
    if (this.myForm.invalid) return;
    this.toastr.success('Actualización completada. *Este cambio es solo una simulación*', 'Perfil actualizado', {
      positionClass: 'toast-bottom-right',
    });
    this.isSaving = true;
  }
}
