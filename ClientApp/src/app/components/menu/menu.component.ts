import { Component, OnInit } from '@angular/core';
import { CanService } from '../../can.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private canService : CanService) { }

  cans: any[] = [];
  selectedCan: any;

  ngOnInit(): void {
    this.canService.getAll().subscribe(data => {
      this.cans = data;
    });
  }

  select(can: any): void {
    this.selectedCan = can;
  }


}
