import { Component } from '@angular/core';
import { IProduct } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  product!: IProduct[]
  constructor(private productService: ProductService) {
    this.productService.getProducts().subscribe(data => {
      this.product = data
    })
  }
  removeItem(id: number) {
    if (window.confirm("Are you sure ?"))
      this.productService.deleteProduct(id).subscribe(() => {
        this.product = this.product.filter(product => product.id !== id)
      })
  }
}
