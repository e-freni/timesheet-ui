import { Component, OnInit } from '@angular/core';
import { PageService } from 'app/services/page.service';
import { Subscription } from 'rxjs';
import { Account } from 'app/models/account.model';
import { AccountService } from 'app/services/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  page: string;
  pageSubscription: Subscription;
  selectedTab: number;
  CALENDAR = 0;
  ANALYTICS = 1;

  //TODO alert of missing hours on the last 7 or 5 or 3 days of the month?
  //TODO send email for real
  //TODO admin add user
  //TODO user change password
  //TODO put all css in style classes and optimize it
  //TODO make a mobile view
  //TODO alert when logging in special days (like christmas!)
  //TODO DARK MODE!

  constructor(private pageService: PageService, private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.getObservableAccount().subscribe((account: Account | null) => {
      if (!account) {
        return;
      }
      this.pageSubscription = this.pageService.getCurrentPage().subscribe({
        next: page => {
          this.page = page;
        },
      });
    });
  }

  switchToAnalytics() {
    this.selectedTab = this.ANALYTICS;
  }

  switchToCalendar() {
    this.selectedTab = this.CALENDAR;
  }
}
