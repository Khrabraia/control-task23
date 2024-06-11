import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../shared/services/product.service";
import {OrderType} from "../../../types/order.type";
declare var $: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {

  private subscription: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;

  orderForm = this.fb.group({
    product: ['', Validators.required],
    name: ['', [Validators.required, Validators.pattern('^[А-ЯЁа-яёA-Za-z]+$')]],
    lastName: ['', [Validators.required, Validators.pattern('^[А-ЯЁа-яёA-Za-z]+$')]],
    phone: ['', [Validators.required, Validators.pattern('^[\+]?[0-9]{11}$')]],
    country: ['', Validators.required],
    zip: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    address: ['', [Validators.required, Validators.pattern('^[A-Za-zА-ЯЁа-яё0-9\\s\\-\\/]*$')]],
    comment: ['']
  });

  public isSuccess: boolean = false;
  public isFail: boolean = false;

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
      if (params['product']) {
        this.orderForm.patchValue({
          product: params['product']
        });
        this.orderForm.get('product')?.disable();
      } else {
        this.router.navigate(['/']);
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.subscriptionOrder?.unsubscribe();
  }

  public createOrder() {

    this.orderForm.get('product')?.enable();

    this.subscriptionOrder = this.subscriptionOrder = this.productService.createOrder({
      product: this.orderForm.value.product as string,
      name: this.orderForm.value.name as string,
      last_name: this.orderForm.value.lastName as string,
      phone: this.orderForm.value.phone as string,
      country: this.orderForm.value.country as string,
      zip: this.orderForm.value.zip as string,
      address: this.orderForm.value.address as string,
      comment: this.orderForm.value.comment
    })
      .subscribe(response => {
        if (response.success && !response.message) {
          this.orderForm.reset();
          this.isSuccess = true;
        } else {
          this.isFail = true;
        }
      })
    this.orderForm.get('product')?.disable();

  }
}
