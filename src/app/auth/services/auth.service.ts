import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment.development';
import { UserInterface } from '@store/interfaces/user.interface';
import { LoginUser } from '@store/interfaces/loginUser.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn = signal(this.checkStatus());
  checkStatus(): boolean {
    return !!localStorage.getItem('accessToken');
  }
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

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("cart");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("wishlist");
    localStorage.removeItem("purchaseHistory");

    this.isLoggedIn.set(false);
  }

  loginStorage(usuario: any) {
    localStorage.setItem("accessToken", usuario.accessToken);
    localStorage.setItem("refreshToken", usuario.refreshToken);
    localStorage.setItem("user", JSON.stringify({
      id: usuario.id,
      username: usuario.username,
      email: usuario.email,
      firstName: usuario.firstName,
      lastName: usuario.lastName,
      gender: usuario.gender,
      image: usuario.image
    }));

  }

}
