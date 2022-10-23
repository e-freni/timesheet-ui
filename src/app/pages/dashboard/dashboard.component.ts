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
