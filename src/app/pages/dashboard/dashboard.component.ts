import { Component, OnInit } from '@angular/core';
import { Account } from 'app/models/account.model';
import { AccountService } from 'app/services/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  page: string;
  selectedTab: number;
  CALENDAR = 0;
  ANALYTICS = 1;

  //TODO alert of missing hours on the last 3 days of the month if current logged hours are not in line
  //TODO alert when logging in special days (like christmas!)
  //TODO user reset password
  //TODO user change password
  //TODO put all css in style classes and optimize it
  //TODO make a mobile view
  //TODO DARK MODE!

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.getObservableAccount().subscribe((account: Account | null) => {
      if (!account) {
        return;
      }
    });
  }

  switchToAnalytics() {
    this.selectedTab = this.ANALYTICS;
  }

  switchToCalendar() {
    this.selectedTab = this.CALENDAR;
  }
}
