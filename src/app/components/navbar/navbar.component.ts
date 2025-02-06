import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private readonly cartService : CartService = inject(CartService);

  miCarrito: number = 0;

  constructor() {
    this.loadCarrito()
  }

  private loadCarrito() {
    this.cartService.carritoTotal.subscribe(
      {
        next: value => {
          this.miCarrito = value;
          
        }
      }
    )
  }
}
