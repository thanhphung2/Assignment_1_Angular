import { Component } from '@angular/core';
import { IProduct } from 'src/app/interfaces/Product';
import { Validators, FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent {
  product!: IProduct
  productForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    price: [0]
  })
  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: ActivatedRoute) {
    this.router.paramMap.subscribe((params => {
      const id = Number(params.get('id'));
      this.productService.getProduct(id).subscribe(data => {
        this.product = data;
        this.productForm.patchValue({
          name: data.name,
          price: data.price
        })
      })
    }))
  }
  onHandleUpdate() {
    const product: IProduct = {
      name: this.productForm.value.name || "",
      price: this.productForm.value.price || 0
    }
    this.productService.updateProduct(product).subscribe((product) => {
      console.log('product', product);

    })
  }
}
