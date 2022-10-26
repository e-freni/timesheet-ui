import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  dateSubject: Subject<Date> = new ReplaySubject<Date | null>(1);

  getObservableDate(): Observable<Date | null> {
    return this.dateSubject.asObservable();
  }

  setDate(date: Date) {
    this.dateSubject.next(date);
  }

  unsubscribe(): void {
    this.dateSubject.next(null);
  }
}
