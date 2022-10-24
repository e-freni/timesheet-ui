import {Component, OnInit} from '@angular/core';
import {PageService} from "app/services/page.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  page: string;
  pageSubscription: Subscription;
  selectedTab: number;

  constructor(
    private pageService: PageService,
  ) {
  }

  //TODO alert of missing hours on the last 7 or 5 or 3 days of the month?
  //TODO send email popover
  //TODO admin add user
  //TODO user change password
  //TODO tooltip for menu switch icons

  ngOnInit(): void {
    this.pageSubscription = this.pageService.getCurrentPage().subscribe({
      next: page => {
        this.page = page;
      }
    });
  }

  CALENDAR = 0
  ANALYTICS = 1

  switchToAnalytics() {
    this.selectedTab = this.ANALYTICS;
  }

  switchToCalendar() {
    this.selectedTab = this.CALENDAR;
  }
}
