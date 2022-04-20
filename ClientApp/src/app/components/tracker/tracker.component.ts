import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {

  constructor() { }

  @Input() count: Number = 0;

  ngOnInit(): void {
    console.log(this.count);
  }

}
