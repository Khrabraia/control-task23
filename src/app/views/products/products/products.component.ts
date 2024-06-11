import { Component, OnInit } from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {Router} from "@angular/router";
import {ProductService} from "../../../shared/services/product.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: ProductType[] = [];

  constructor(private productService: ProductService,
              private router: Router) {}

  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (error) => {
          console.log(error);
          this.router.navigate(['/']);
        }

      })

  }

}
