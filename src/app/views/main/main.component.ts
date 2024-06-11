import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable, Subscription} from "rxjs";
declare let $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  private observable: Observable<boolean>;
  private subscription: Subscription | null = null;

  isModal = false;
  constructor() {
    this.observable = new Observable((observer) => {
      const timeout1 = setTimeout(() => {
        observer.next(this.isModal = true);
      }, 10000);

      return {
            unsubscribe() {
              clearTimeout(timeout1);
            }
          }

    })
  }

    ngOnInit(): void {
        $( "#accordion" ).accordion();
      this.subscription = this.observable.subscribe({
        next: (next: boolean) => {
          console.log(this.isModal);
        }
        })
    }

    ngOnDestroy() {
      this.subscription?.unsubscribe();
    }

}
