import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment.development';
import { Observable } from 'rxjs';
import { Products, Product } from '@store/interfaces/product.interface';
import { CartProduct } from '@store/interfaces/productCart.interface';

@Injectable({ providedIn: 'root' })

export class ProductsService {
  private http = inject(HttpClient);
  productsCart = signal<CartProduct[]>(JSON.parse(localStorage.getItem('cart')!) || []);

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

  getSearchProductID(id: string): Observable<Product> {
    return this.http.get<Product>(`https://dummyjson.com/products/${id}`);
  }
  addCartStorage(producto: CartProduct) {

    const carrito: CartProduct[] = JSON.parse(localStorage.getItem('cart')!) || [];
    const productoExistente = carrito.find(item => item.id === producto.id);

    if (productoExistente) {
      // Si ya está, aumentamos cantidad
      productoExistente.quantity += 1;
    } else {
      // Si no, lo añadimos
      carrito.push(producto);
    }

    this.productsCart.set(carrito);
    // Guardamos actualizado
    localStorage.setItem('cart', JSON.stringify(carrito));
  }

  increaseProduct(productId: string) {
    const carrito: CartProduct[] = JSON.parse(localStorage.getItem('cart')!) || [];
    const productoExistente = carrito.find(item => item.id === productId);
    if (productoExistente) {
      productoExistente.quantity += 1;

      //Lo cambiamos en el set
      this.productsCart.set(carrito);

      // Guardamos actualizado
      localStorage.setItem('cart', JSON.stringify(carrito));
    }
  }

  /* Whislist */
  saveProductWishlist(product: Product) {
    const productsWishlist: Product[] = JSON.parse(localStorage.getItem('wishlist') || '[]');
    productsWishlist.push(product);
    localStorage.setItem('wishlist', JSON.stringify(productsWishlist));

  }

  isProductInWishlist(productId: number): boolean {
    const productsWishlist: Product[] = JSON.parse(localStorage.getItem('wishlist') || '[]');
    return productsWishlist.some(product => product.id === productId);
  }

  removeProductFromWishlist(productId: number) {
    const productsWishlist: Product[] = JSON.parse(localStorage.getItem('wishlist') || '[]');

    const updatedWishlist = productsWishlist.filter(product => product.id !== productId);

    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  }

  /* History */
  saveProductToPurchaseHistory(products: CartProduct[]) {
    const today = new Date().toISOString().split('T')[0]; // e.g., "2025-05-22"

    // Obtener el historial completo
    const fullHistory: { [date: string]: CartProduct[] } = JSON.parse(localStorage.getItem('purchaseHistory') || '{}');

    // Si no hay entrada para hoy, inicializarla
    if (!fullHistory[today]) {
      fullHistory[today] = [];
    }

    products.forEach(product => {
      const existing = fullHistory[today].find(p => p.id === product.id);

      if (existing) {
        existing.quantity += product.quantity;

      } else {
        fullHistory[today].push({ ...product });
      }
    });

    // Guardar de nuevo el historial completo
    localStorage.setItem('purchaseHistory', JSON.stringify(fullHistory));
  }


  getPurchaseHistory(): Product[] {
    return JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
  }

  decreaseProduct(productId: string) {
    const carrito: CartProduct[] = JSON.parse(localStorage.getItem('cart')!) || [];
    const productoExistente = carrito.find(item => item.id === productId);
    if (productoExistente && productoExistente.quantity > 1) {
      productoExistente.quantity -= 1;

      this.productsCart.set(carrito);

      localStorage.setItem('cart', JSON.stringify(carrito));
    }
  }

  removeCartItem(productId: string) {
    const carritoActual: CartProduct[] = this.productsCart();

    const nuevoCarrito = carritoActual.filter(producto => producto.id !== productId);

    this.productsCart.set(nuevoCarrito);

    localStorage.setItem('cart', JSON.stringify(nuevoCarrito));
  }

}
