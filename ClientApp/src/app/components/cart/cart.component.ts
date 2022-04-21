import { Component, OnInit, Input, Output, SimpleChanges, OnChanges, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnChanges {

  constructor(private modalService: NgbModal) { }

  @Input() selectedCan: any;
  @Input() count: number = 0;
  @Output() selectedCanChange = new EventEmitter();

  change: number = 0;
  earnedMoney: number = 0;
  ccPaymentsMade: number = 0;

  ngOnInit(): void {
    console.log(this.count);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.selectedCan);
  }

  removeSelectedCan(): void {
    this.selectedCan = null;
    this.selectedCanChange.emit(this.selectedCan);
  }

  open(content: any) {
    this.modalService.open(content);
  }

  payCash(paymentAmount: string) {
    console.log(Number(paymentAmount));

    const payment = Number(paymentAmount);

    this.change = Math.round((payment - this.selectedCan.price) * 100) /100;
    this.selectedCan.stock = this.selectedCan.stock - 1;
    this.selectedCanChange.emit(this.selectedCan);
    this.earnedMoney += this.selectedCan.price;
    this.count -= 1;

    console.log(this.change);
    this.modalService.dismissAll();
    alert("Thank you for you purchase. Your change is " + this.change + ". Please get your can. :)");
  }

  payCard() {
    this.selectedCan.stock = this.selectedCan.stock - 1;
    this.ccPaymentsMade += this.selectedCan.price;
    this.modalService.dismissAll();
    alert("Payment is processed. Thank you for you purchase. Please get your can. :)");
  }
}
