import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  date: Date;

  constructor() {
  }

  private static getTodaysDate() {
    let date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }

  ngOnInit(): void {
    this.date = DashboardComponent.getTodaysDate()
  }

  displayMonth(): string {
    return new Intl.DateTimeFormat("it-IT", {month: "long"}).format(this.date).toUpperCase();
  }

  displayYear(): string {
    return new Intl.DateTimeFormat("it-IT", {year: "numeric"}).format(this.date).toUpperCase();
  }

  previousMonth() {
    this.date.setMonth(this.date.getMonth() - 1);
  }

  nextMonth() {
    this.date.setMonth(this.date.getMonth() + 1);
    console.log(this.date)
  }
}
