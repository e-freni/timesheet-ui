import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  dateSubject = new ReplaySubject<Date | null>(1);
  private date: Date;

  getObservableDate(): Observable<Date | null> {
    return this.dateSubject.asObservable();
  }

  setDate(date: Date) {
    this.dateSubject.next(date);
  }

  unsubscribe(): void {
    this.dateSubject.next(null);
    this.date = null;
  }
}
