import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment.development';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.userApi}/auth/login`, { email, password });
  }

  register(dataUser: {}): Observable<any> {
    return this.http.post(`${environment.userApi}/auth/add`, dataUser);
  }
}
