import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subject} from "rxjs";
import {getTodaysDate} from "app/utils/date-utilities";

@Injectable({
  providedIn: 'root'
})
export class DateService {

  dateSubject: Subject<Date> = new ReplaySubject<Date | null>(1);
  date: Date;

  getObservableDate(): Observable<Date | null> {
    return this.dateSubject.asObservable();
  }

  setDate(date: Date) {
    this.dateSubject.next(date);
  }

  unsubscribe(): void {
    this.dateSubject.next(null);
    this.date = getTodaysDate()
  }

}
