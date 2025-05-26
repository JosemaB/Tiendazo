import { inject } from '@angular/core';
import {
  CanMatchFn,
  Route,
  Router,
  UrlSegment,
} from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

export const AuthenticatedGuard: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.checkStatus()) {
    router.navigateByUrl('/');
    return false;
  }

  return true;
};
