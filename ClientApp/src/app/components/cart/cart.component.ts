import { Component, OnInit, Input, Output, SimpleChanges, OnChanges, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//@Component({
//  template: `
//    <div class="modal-header">
//      <h4 class="modal-title" id="modal-basic-title">Pay By Cash</h4>
//      <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
//    </div>
//    <div class="modal-body">
//      <form>
//        <div class="mb-3">
//          <label for="amount">Payment Amount</label>
//          <div class="input-group">
//            <span class="currency-code">A$</span>
//            <input type="number" min="{{selectedCan.price}}" step="0.01" id="paymentAmount" dirname="paymentAmount" class="form-control text-currency" placeholder="{{selectedCan.price}}" name="pa" #paymentAmount required>
//          </div>
//        </div>
//      </form>
//    </div>
//    <div class="modal-footer">
//        <button type="button" class="btn btn-outline-dark" (click)="pay(paymentAmount.value)">Pay</button>
//    </div>
//  `
//})
//export class NgbdModal1Content {
//  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) { }

//  @Input() selectedCan: any;
//  @Output() selectedCanChange = new EventEmitter();
//  change: number = 0;

//  open() { this.modalService.open(NgbdModal2Content, { size: 'lg' }); }

//  pay(paymentAmount: string) {
//    console.log(Number(paymentAmount));

//    const payment = Number(paymentAmount);

//    this.change = payment - this.selectedCan.price;
//    this.selectedCan.stock = this.selectedCan.stock - 1;
//    this.selectedCanChange.emit(this.selectedCan);

//    console.log(this.change);
//    this.modalService.dismissAll();
//  }
//}

//@Component({
//  template: `
//    <div class="modal-header">
//      <h4 class="modal-title">Hi there!</h4>
//      <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
//    </div>
//    <div class="modal-body">
//      <p>Hello, World!</p>
//    </div>
//    <div class="modal-footer">
//      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
//    </div>
//  `
//})
//export class NgbdModal2Content {
//  constructor(public activeModal: NgbActiveModal) { }
//}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnChanges {

  constructor(private modalService: NgbModal) { }

  @Input() selectedCan: any;
  @Input() count: Number = 0;
  @Output() selectedCanChange = new EventEmitter();

  change: number = 0;

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

    console.log(this.change);
    this.modalService.dismissAll();
    alert("Thank you for you purchase. Your change is " + this.change + ". Please get your can. :)");
  }

  payCard() {
    this.selectedCan.stock = this.selectedCan.stock - 1;
    this.modalService.dismissAll();
    alert("Payment is processed. Thank you for you purchase. Please get your can. :)");
  }
}
