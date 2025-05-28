import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginUser } from '@store/interfaces/loginUser.interface';
import { UserInterface } from '@store/interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  http = inject(HttpClient);
  user = signal<LoginUser>(JSON.parse(localStorage.getItem('user')!) || []);

  changeAvatar(img: string) {
    const currentUser = this.user();

    // Modificar la imagen
    const updatedUser = { ...currentUser, image: img };

    // Actualizar la señal
    this.user.set(updatedUser);


    localStorage.setItem('user', JSON.stringify(updatedUser));
  }
  reloadUser() {
    this.user.set(JSON.parse(localStorage.getItem('user')!));
  }

  updateUserPerfil(username: string, email: string, biography: string) {
    const currentUser = this.user();

    // Modificar la imagen
    const updatedUser = { ...currentUser, username, email, biography };

    // Actualizar la señal
    this.user.set(updatedUser);


    localStorage.setItem('user', JSON.stringify(updatedUser));
  }

  getAllUser(page = 1, limit = 12): Observable<UserInterface> {
    const skip = (page - 1) * limit;
    return this.http.get<UserInterface>(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);
  }

  getSearchUser(user: string): Observable<UserInterface> {
    return this.http.get<UserInterface>(`https://dummyjson.com/products/search?q=${user}`);
  }
}
