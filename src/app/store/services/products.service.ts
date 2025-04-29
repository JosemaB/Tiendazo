import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { Observable } from 'rxjs';
import { Products } from '@store/interfaces/product.interface';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);

  getAllProducts(): Observable<Products> {
    return this.http.get<Products>(`${environment.productsApi}`);
  }
  getAllProductsTechnology(): Observable<Products> {
    return this.http.get<Products>(`${environment.productsCategoryApi}/laptops`);
  }
}
