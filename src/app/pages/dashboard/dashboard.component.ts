import {Component, OnInit} from '@angular/core';
import {PageService} from "app/services/page.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  page: string;
  pageSubscription: Subscription;

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
}
