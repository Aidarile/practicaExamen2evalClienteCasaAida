import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/interface';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons/faCartShopping';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { CurrencyPipe } from '@angular/common';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap'
import { RouterLink } from '@angular/router';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  imports: [FaIconComponent, CurrencyPipe, NgbToast, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  private readonly cartService : CartService = inject(CartService);

  private readonly productService: ProductService = inject(ProductService);

  productList: Product[] = [];

  //Mensaje de aviso en la web:
  toast = {
    body: '',
    color: 'bg-success'
  }
  toastShow: boolean = false;
  loaded: boolean = false;


  constructor() {
    this.loadProducts();
  }

  private loadProducts() {
    this.productService.getProducts().subscribe(
      {
        next: value => {
          this.productList = value;
        },
        complete: () => {
          this.loaded = true;
          this.showToast('Products loaded successfully!!', "bg-success");
        },
        error: err => {
          this.showToast(err.message, "bg-danger");
        }
      }
    )
  }
  private showToast(message: string, color: string) {
    this.toast.body = message;
    this.toast.color = color;
    this.toastShow =  true;
    setTimeout(() => {
      this.toastShow = false;
    }, 1500); //<-- esto hace que se cierre al cabo de X segundos
  }

  protected readonly faCartShopping = faCartShopping;
  protected readonly faEdit = faEdit;
  protected readonly faTrashCan = faTrashCan;

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(
      {
        next: value => {
          this.showToast(value.title + ' deleted!', 'bg-success');
        },
        error: err => {
          this.showToast(
            err.message,
            'bg-danger');
        }
      }
    )
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    }

}
