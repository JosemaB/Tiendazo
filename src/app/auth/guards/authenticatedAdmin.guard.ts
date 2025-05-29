import { inject } from '@angular/core';
import {
  CanMatchFn,
  Route,
  Router,
  UrlSegment
} from '@angular/router';
import { UserService } from '@store/services/user.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const AuthenticatedAdminGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  const router = inject(Router);
  const userService = inject(UserService);
  const userId = userService.user().id?.toString();

  return userService.getSearchUserID(userId!).pipe(
    map(user => {
      return user?.role === 'admin' ? true : router.parseUrl('/');
    }),
    catchError(() => of(router.parseUrl('/')))
  );
};
