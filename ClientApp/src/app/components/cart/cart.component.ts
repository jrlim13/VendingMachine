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

  pcForm: FormGroup;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.pcForm = new FormGroup({
      paymentAmount: new FormControl(0, [
        Validators.required,
        Validators.min(this.selectedCan?.price ?? 2.89)
      ])
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.selectedCan);
    if (this.selectedCan !== null || this.selectedCan !== undefined) {
      this.pcForm.get("paymentAmount").setValidators(Validators.min(this.selectedCan?.price ?? 2.89));
      this.pcForm.get("paymentAmount").updateValueAndValidity();
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
    if (this.pcForm.valid) {
      const payment = Number(paymentAmount);

      this.change = Math.round((payment - this.selectedCan.price) * 100) / 100;

      this.selectedCan.stock = this.selectedCan.stock - 1;

      this.count -= 1;
      this.earnedMoney += this.selectedCan.price;

      this.modalService.dismissAll();
      alert("Thank you for you purchase. Your change is A$" + this.change + ". Please get your can. :)");

      this.selectedCan = null;
      this.pcForm.get("paymentAmount").setValue(2.89);
      this.pcForm.get("paymentAmount").updateValueAndValidity();

      this.updateParent();
    }
    else {
      console.log(this.pcForm.valid);
      console.log(this.pcForm.value.paymentAmount);

    }
  }

  payCard() {
    this.selectedCan.stock = this.selectedCan.stock - 1;
    this.ccPaymentsMade += this.selectedCan.price;
    this.count -= 1;

    this.modalService.dismissAll();

    alert("Payment is processed. Thank you for you purchase. Please get your can. :)");

    this.selectedCan = null;
    this.updateParent();
  }

  updateParent() {
    this.selectedCanChange.emit(this.selectedCan);
    this.countChange.emit(this.count);
    this.earnedMoneyChange.emit(this.earnedMoney);
    this.ccPaymentsMadeChange.emit(this.ccPaymentsMade);
  }
}
