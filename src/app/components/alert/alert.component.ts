import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert } from 'app/models/alert.model';
import { AlertService } from 'app/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
})
export class AlertComponent implements OnInit, OnDestroy {
  alertList: Alert[] = [];
  private alertSubscription: Subscription | undefined;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertSubscription = this.alertService.getAlertState().subscribe(alert => {
      this.alertList.push(alert);
      setTimeout(() => {
        this.dismissAlert(alert);
      }, 3000);
    });
  }

  ngOnDestroy(): void {
    this.alertSubscription?.unsubscribe();
  }

  dismissAlert(alert: Alert): void {
    setTimeout(() => {
      this.alertList = this.alertList.filter(a => a !== alert);
    }, 200);
  }
}
