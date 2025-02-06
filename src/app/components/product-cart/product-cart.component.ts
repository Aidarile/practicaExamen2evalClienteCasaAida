import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../common/interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-cart',
  imports: [CurrencyPipe],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.css'
})
export class ProductCartComponent {

  private readonly cartService : CartService = inject(CartService);

  productos: Product[] = [];

  productPrice: number = 0;

  constructor() {
    this.loadCart();
  }

  private loadCart() {
    this.cartService.carrito.subscribe(
      {
        next: value => {
          this.productos = value;
        }
      }
    )
    this.cartService.carritoPrice.subscribe(
      {
        next: value => {
          this.productPrice = value;
        }
      }
    )
  }

}
