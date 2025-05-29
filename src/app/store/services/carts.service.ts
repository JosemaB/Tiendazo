import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CartsInterface } from '@store/interfaces/carts.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartsService {
  http = inject(HttpClient);

  getAllCarts(page = 1, limit = 12): Observable<CartsInterface> {
    const skip = (page - 1) * limit;
    return this.http.get<CartsInterface>(`https://dummyjson.com/carts?limit=${limit}&skip=${skip}`);
  }

  getSearchCart(id: string): Observable<CartsInterface> {
    return this.http.get<CartsInterface>(`https://dummyjson.com/carts/user/${id}`);
  }
}
