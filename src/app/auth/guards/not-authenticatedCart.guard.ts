import { inject } from '@angular/core';
import {
  CanMatchFn,
  Route,
  Router,
  UrlSegment,
} from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const NotAuthenticatedCartGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);
  if (!authService.checkStatus()) {
    // Mostrar alerta o notificación


    document.getElementById('overlay-end-example-backdrop')?.remove();
    const attemptedUrl = '/' + segments.map(s => s.path).join('/');
    router.navigate(['/auth/login'], { queryParams: { returnUrl: attemptedUrl } });
    snackBar.open('Debes iniciar sesión para realizar una compra', undefined, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['custom-error-snackbar']

    });
    document.body.style.overflow = 'auto';

    return false;
  }

  return true;
};
