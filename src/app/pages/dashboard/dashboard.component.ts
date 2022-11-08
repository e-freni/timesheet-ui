import { Component, OnInit } from '@angular/core';
import { Account } from 'app/models/account.model';
import { AccountService } from 'app/services/rest/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  CALENDAR = 0;
  ANALYTICS = 1;

  page: string;
  selectedTab: number;

  //TODO alert of missing hours on the last 3 days of the month if current logged hours are not in line
  //TODO alert when logging in special days (like Christmas!)
  //TODO user edit details (es. email)
  //TODO put all css in style classes and optimize it
  //TODO make a mobile view
  //TODO DARK MODE!
  //TODO (maybe) massive normal working days log

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
