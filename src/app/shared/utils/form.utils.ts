import { AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { catchError, map, Observable, of } from 'rxjs';


export class FormUtils {
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static passwordPattern = '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';
  static textPattern = '^[a-zA-ZÁÉÍÓÚáéíóúÑñ\\s]*$';
  static phoneNumberPattern = '^\\+?\\d[\\d\\s-]{6,19}$';
  static addressPattern = "^(?=.*[a-zA-ZÁÉÍÓÚáéíóúÑñ])(?=.*\\d)[a-zA-Z0-9ÁÉÍÓÚáéíóúÑñ\\s.,#\\-\\/'°]+$";
  static postalCodePattern = '^\\d{4,5}$';
  static locationPattern = "^[a-zA-ZÁÉÍÓÚáéíóúÑñ\\s'-]+$";
  static ibanPattern = '^[A-Z]{2}[0-9]{13}$';
  static cardNumberPattern = '^[0-9]{13,20}$';
  static cardCvvPattern = '^[0-9]{3,4}$';

  static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {

        case 'usernameFound':
          return 'Este nombre de usuario ya está en uso';

        case 'required':
          return 'El campo es obligatorio';

        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;

        case 'maxlength':
          return `Máximo ${errors['maxlength'].requiredLength} caracteres.`;

        case 'email':
          return `El valor ingresado no es un correo electrónico`;

        case 'emailFound':
          return `El correo electrónico ya está en uso`;

        case 'pattern':
          if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
            return 'El correo electrónico no es válido';

          } else if (errors['pattern'].requiredPattern === FormUtils.passwordPattern) {
            return 'La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y un símbolo especial (@, $, %, etc.)';

          } else if (errors['pattern'].requiredPattern === FormUtils.textPattern) {
            return 'Solo se permiten letras';

          } else if (errors['pattern'].requiredPattern === FormUtils.phoneNumberPattern) {
            return 'Ingrese un número de teléfono válido';

          } else if (errors['pattern'].requiredPattern === FormUtils.addressPattern) {
            return 'La dirección debe contener al menos un número, y solo puede incluir letras, números y los símbolos , . # - / \' ° (Ej: Calle 123)';

          } else if (errors['pattern'].requiredPattern === FormUtils.postalCodePattern) {
            return 'El código postal debe contener exactamente 4 a 5 números';

          } else if (errors['pattern'].requiredPattern === FormUtils.locationPattern) {
            return "Nombre inválido. Use solo letras, espacios y los caracteres ( ', y, - )";

          } else if (errors['pattern'].requiredPattern === FormUtils.ibanPattern) {
            return "IBAN inválido. Usa hasta 15 caracteres en mayúsculas y números solamente";
          }
          else if (errors['pattern'].requiredPattern === FormUtils.cardNumberPattern) {
            return "Número de tarjeta inválido. Debe tener entre 13 y 20 dígitos";
          }
          else if (errors['pattern'].requiredPattern === FormUtils.cardCvvPattern) {
            return "CVV inválido. Debe tener 3 o 4 dígitos";
          }

          return 'El de patrón contra expresión regular' + errors['pattern'].requiredPattern;

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

