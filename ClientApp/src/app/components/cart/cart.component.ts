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
  @Input() earnedMoney: number = 0;
  @Input() ccPaymentsMade: number = 0;

  @Output() selectedCanChange = new EventEmitter();

  @Output() countChange = new EventEmitter<number>();
  @Output() earnedMoneyChange = new EventEmitter<number>();
  @Output() ccPaymentsMadeChange = new EventEmitter<number>();

  change: number = 0;

  ngOnInit(): void {
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
    const payment = Number(paymentAmount);

    this.change = Math.round((payment - this.selectedCan.price) * 100) / 100;

    this.selectedCan.stock = this.selectedCan.stock - 1;
    
    this.count -= 1;
    this.earnedMoney += this.selectedCan.price;

    this.updateParent();

    console.log(this.change);
    console.log(this.count);
    console.log(this.earnedMoney);
    console.log(this.ccPaymentsMade);

    this.modalService.dismissAll();
    alert("Thank you for you purchase. Your change is " + this.change + ". Please get your can. :)");
  }

  payCard() {
    this.selectedCan.stock = this.selectedCan.stock - 1;
    this.ccPaymentsMade += this.selectedCan.price;
    this.count -= 1;

    this.updateParent();

    console.log(this.count);
    console.log(this.earnedMoney);
    console.log(this.ccPaymentsMade);

    this.modalService.dismissAll();

    alert("Payment is processed. Thank you for you purchase. Please get your can. :)");
  }

  updateParent() {
    this.selectedCanChange.emit(this.selectedCan);
    this.countChange.emit(this.count);
    this.earnedMoneyChange.emit(this.earnedMoney);
    this.ccPaymentsMadeChange.emit(this.ccPaymentsMade);
  }
}
