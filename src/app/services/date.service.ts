import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  dateSubject = new ReplaySubject<Date | null>(1);
  private date: Date;

  getDate(): Subject<Date | null> {
    return this.dateSubject;
  }

  setDate(date: Date) {
    this.dateSubject.next(date);
  }

  unsubscribe(): void {
    this.dateSubject.next(null);
    this.date = null;
  }
}
