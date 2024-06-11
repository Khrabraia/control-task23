import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductType} from "../../../../types/product.type";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  product: ProductType;

  private subscription: Subscription | null = null;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private router: Router) {

    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: ''
    }
  }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe(params => {
      if (params['id']) {

        this.productService.getProduct(+params['id'])
          .subscribe({
            next: (data: ProductType) => {
              this.product = data;
            },
            error:  (error) => {
              this.router.navigate(['/']);
            }
          });
      }
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
