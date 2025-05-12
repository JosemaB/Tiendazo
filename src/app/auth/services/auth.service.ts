import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment.development';
import { UserInterface } from '@store/interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${environment.userApi}/login`, { "username": username, "password": password });
  }

  register(dataUser: {}): Observable<any> {
    return this.http.post(`${environment.userApi}/add`, dataUser);
  }

  checkUsernameExists(username: string): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${environment.usersApi}/search?q=${username}`);
  }

}
