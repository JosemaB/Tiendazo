import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { Observable } from 'rxjs';
import { Products, Product } from '@store/interfaces/product.interface';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);

  getAllProducts(page = 1, limit = 12): Observable<Products> {
    const skip = (page - 1) * limit;
    return this.http.get<Products>(`${environment.productsApi}?limit=${limit}&skip=${skip}`);
  }

  getCategoryProducts(categorie: string): Observable<Products> {
    return this.http.get<Products>(`${categorie !== 'categorie' ? environment.productsCategoryApi + '/' + categorie : environment.productsApi}`);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.productsApi}/${id}`);
  }

  getSearchProduct(product: string): Observable<Products> {
    return this.http.get(`https://dummyjson.com/products/search?q=${product}`);
  }
}
