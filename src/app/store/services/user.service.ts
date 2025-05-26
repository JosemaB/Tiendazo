import { Injectable, signal } from '@angular/core';
import { LoginUser } from '@store/interfaces/loginUser.interface';

@Injectable({ providedIn: 'root' })
export class UserService {

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
}
