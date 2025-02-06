import { Component, inject, Input, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons/faCartShopping';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap'
import { Product } from '../../common/interface';

@Component({
  selector: 'app-product-edit',
  imports: [CurrencyPipe, FaIconComponent, NgbToast, ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit {

  private readonly productService : ProductService = inject(ProductService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  @Input('id')id!: number;

  formProduct: FormGroup = this.formBuilder.group({
    id: [0, [Validators.required]],
    title: ['', [Validators.required]],
    price: [0, [Validators.required]],
    description: ['', [Validators.required]],
    category: ['', [Validators.required]],
    image: ['', [Validators.required]],
    rating: this.formBuilder.group({
      rate: [0, [Validators.required]],
      count: [0, [Validators.required]]
    })
  });


  //Mensaje de aviso en la web:
  toast = {
    body: '',
    color: 'bg-success'
  }
  toastShow: boolean = false;

  edit: boolean = false;

  load: boolean = false;

   /* GETTERS */
   get title():any { return this.formProduct.get('title'); }
   get price():any { return this.formProduct.get('price'); }
   get description():any { return this.formProduct.get('description'); }
   get category():any { return this.formProduct.get('category'); }
   get image():any { return this.formProduct.get('image'); }
   get rate():any { return this.formProduct.get('rating.rate'); }
   get count():any { return this.formProduct.get('rating.count'); }


    ngOnInit(): void {
    if (this.id) {
      this.edit = true;
      this.productService.getProduct(this.id).subscribe(
        {
          next: value => {
            this.load = true;
            this.formProduct.setValue(value);
            this.showToast('Product loaded successfully!', 'bg-success', 1200)
          },
          error: err => {
            this.showToast(err.message, 'bg-danger', 2200)
          }
        }
      )
    } else {
      this.edit = false;
      this.load = true;
      this.formProduct.reset();
    }
  }

  onSubmit() {
    if (this.formProduct.invalid) {
      this.formProduct.markAllAsTouched();
      return;
    }
    if (this.edit){
      this.productService.updateProduct(
        this.formProduct.getRawValue()).subscribe(
          {
            next: value => {
              this.showToast(
                value.title + ' updated successfully!', 'bg-success', 1200)
            },
            error: err => {
              this.showToast(
                err.message, 'bg-danger', 2200)
            }
          }
        )
    } else {
      this.productService.addProduct(
        this.formProduct.getRawValue()).subscribe(
          {
            next: value => {
              this.showToast(
                value.title + ' added successfully!', 'bg-success', 1200)
            },
            error: err => {
              this.showToast(
                err.message, 'bg-danger', 2200)
            }
          }
        )
    }
  }

  private showToast(message: string, color: string, duration: number) {
    this.toast.body = message;
    this.toast.color = color;
    this.toastShow =  true;
    setTimeout(() => {
      this.toastShow = false;
    }, duration); //<-- esto hace que se cierre al cabo de X segundos
  }

    protected readonly faCartShopping = faCartShopping;
    protected readonly faEdit = faEdit;
    protected readonly faTrashCan = faTrashCan;


}
