import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {

  constructor() { }

  @Input() count: number = 0;
  @Input() earnedMoney: number = 0;
  @Input() ccPaymentsMade: number = 0;

  ngOnInit(): void {
    console.log(this.count);
    console.log(this.earnedMoney);
  }

}
