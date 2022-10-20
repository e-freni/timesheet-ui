import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";
import {Alert} from "app/models/alert.model";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alert: ReplaySubject<Alert> = new ReplaySubject<Alert>(1);

  getAlertState(): Observable<Alert> {
    return this.alert.asObservable();
  }

  addAlert(alert: Alert): void {
    this.alert.next(alert);
  }
}
