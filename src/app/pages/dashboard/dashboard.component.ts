import {Component, OnDestroy, OnInit} from '@angular/core';
import {DateService} from "app/services/date.service";
import {PageService} from "app/services/page.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  page: string;
  pageSubscription: Subscription;

  constructor(
    private pageService: PageService,

  ) { }

  ngOnInit(): void {
    this.pageSubscription = this.pageService.getCurrentPage().subscribe(page => {
      this.page = page;
    });
  }

  ngOnDestroy(): void {
    this.pageSubscription.unsubscribe()
  }

}
