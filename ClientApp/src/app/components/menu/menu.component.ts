import { Component, OnInit, Directive, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CanService } from '../../can.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private canService: CanService, private modalService: NgbModal) { }

  cans: any[] = [];
  count: number = 0;
  selectedCan: any;
  canToRestock: any;

  ngOnInit(): void {
    this.canService.getAll().subscribe(data => {
      this.cans = data;
      this.count = this.cans.reduce((prev, cur) => {
        return prev + cur.stock;
      }, 0);
      console.log(this.count);
    });
  }

  select(can: any): void {
    this.selectedCan = can;
  }

  openRestock(can: any, content: any) {
    this.canToRestock = can;
    this.modalService.open(content);
  }

  restock(amount: string) {
    this.canToRestock.stock += Number(amount);
    console.log(this.canToRestock.stock, amount);
    this.modalService.dismissAll();
  }
}
