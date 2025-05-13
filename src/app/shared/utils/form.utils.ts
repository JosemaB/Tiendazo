import { AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { catchError, map, Observable, of } from 'rxjs';


export class FormUtils {
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static passwordPattern = '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';

  static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'usernameFound':
          return 'Este nombre de usuario ya está en uso';

        case 'required':
          return 'El campo es obligatorio';

        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres.`;

        case 'email':
          return `El valor ingresado no es un correo electrónico`;

        case 'emailFound':
          return `El correo electrónico ya está en uso`;

        case 'pattern':
          if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
            return 'El correo electrónico no es válido';
          } else if (errors['pattern'].requiredPattern === FormUtils.passwordPattern) {
            return 'La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y un símbolo especial (@, $, %, etc.)';
          }
          return 'El de patrón contra expresión regular';

        default:
          return `Error de validación no controlado ${key}`;
      }
    }

    return null;
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return FormUtils.getTextError(errors);
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      !!form.controls[fieldName].errors && form.controls[fieldName].touched
    );
  }

  static isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      // Only return an error if both fields have values and they don't match
      if (field1Value && field2Value && field1Value !== field2Value) {
        return { passwordsNotEqual: true };
      }

      // If the fields are empty, don't return an error
      return null;
    };
  }

  static usernameExists(authService: AuthService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return authService.checkUsernameExists(control.value).pipe(
        map((user) => {
          const exists = user.users!.some(u => u.username === control.value);
          return exists ? { usernameFound: true } : null;
        }),
        catchError((err) => {
          console.error('Error en validador:', err);
          return of(null);
        })
      );
    };
  }


  static emailExists(authService: AuthService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return authService.checkUsernameExists(control.value).pipe(
        map((user) => {
          console.log(user);
          const exists = user.users!.some(u => u.email === control.value);
          return exists ? { emailFound: true } : null;
        }),
        catchError((err) => {
          console.error('Error en validador:', err);
          return of(null);
        })
      );
    };
  }

}

