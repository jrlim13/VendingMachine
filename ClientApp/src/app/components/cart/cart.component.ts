import { Component, OnInit, Input, Output, SimpleChanges, OnChanges, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { zip } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnChanges {

  @Input() selectedCan: any;
  @Input() count: number = 0;
  @Input() earnedMoney: number = 0;
  @Input() ccPaymentsMade: number = 0;

  @Output() selectedCanChange = new EventEmitter();

  @Output() countChange = new EventEmitter<number>();
  @Output() earnedMoneyChange = new EventEmitter<number>();
  @Output() ccPaymentsMadeChange = new EventEmitter<number>();

  change: number = 0;

  pCashForm: FormGroup;
  pCardForm: FormGroup;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.pCashForm = new FormGroup({
      paymentAmount: new FormControl(0, [
        Validators.required,
        Validators.min(this.selectedCan?.price ?? 2.89)
      ])
    });

    this.pCardForm = new FormGroup({
      cardNumber: new FormControl("", [
        Validators.required,
      ]),
      expDate: new FormControl("", [
        Validators.required,
      ]),
      cvc: new FormControl("", [
        Validators.required,
      ])
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.selectedCan);
    if (this.selectedCan !== null || this.selectedCan !== undefined) {
      this.pCashForm?.get("paymentAmount").setValidators(Validators.min(this.selectedCan?.price ?? 2.89));
      this.pCashForm?.get("paymentAmount").updateValueAndValidity();
    }
  }

  removeSelectedCan(): void {
    this.selectedCan = null;
    this.selectedCanChange.emit(this.selectedCan);
  }

  open(content: any) {
    this.modalService.open(content);
  }

  payCash(paymentAmount: string) {
    if (this.pCashForm.valid) {
      const payment = Number(paymentAmount);

      this.change = Math.round((payment - this.selectedCan.price) * 100) / 100;

      this.selectedCan.stock = this.selectedCan.stock - 1;

      this.count -= 1;
      this.earnedMoney += this.selectedCan.price;

      this.modalService.dismissAll();
      alert("Thank you for you purchase. Your change is A$" + this.change + ". Please get your can. :)");

      this.selectedCan = null;
      this.pCashForm.get("paymentAmount").setValue(2.89);
      this.pCashForm.get("paymentAmount").updateValueAndValidity();

      this.updateParent();
    }
    else {
      console.log(this.pCashForm.valid);
      console.log(this.pCashForm.value.paymentAmount);

    }
  }

  payCard() {
    if (this.pCardForm.valid) {
      this.selectedCan.stock = this.selectedCan.stock - 1;
      this.ccPaymentsMade += this.selectedCan.price;
      this.count -= 1;

      this.modalService.dismissAll();

      alert("Payment is processed. Thank you for you purchase. Please get your can. :)");

      this.selectedCan = null;
      this.updateParent();
    }
  }

  updateParent() {
    this.selectedCanChange.emit(this.selectedCan);
    this.countChange.emit(this.count);
    this.earnedMoneyChange.emit(this.earnedMoney);
    this.ccPaymentsMadeChange.emit(this.ccPaymentsMade);
  }
}
