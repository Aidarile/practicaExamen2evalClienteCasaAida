import { Product } from './../common/interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  carrito: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  // Numero de elementos del carrito: 
  carritoTotal: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  // Precio del carrito:
  carritoPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(product: Product) {
    const carritoAux: Product[] = this.carrito.value;
    carritoAux.push(product);
    this.carrito.next(carritoAux);

    this.carritoPrice.next(this.carritoPrice.value + product.price);

    this.carritoTotal.next(this.carritoTotal.value + 1);
  }
}
