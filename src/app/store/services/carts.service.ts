import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CartsInterface } from '@store/interfaces/carts.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartsService {
  http = inject(HttpClient);

  getAllCarts(): Observable<CartsInterface> {
    return this.http.get<any>('https://dummyjson.com/carts');
  }
}
