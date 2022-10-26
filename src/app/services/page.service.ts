import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  pageSubject: Subject<string> = new BehaviorSubject<string>('calendar');
  page: string;

  getCurrentPage(): Observable<string | null> {
    return this.pageSubject.asObservable();
  }

  unsubscribe(): void {
    this.pageSubject.next(null);
    this.page = 'calendar';
  }
}
