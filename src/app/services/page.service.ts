import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {getTodaysDate} from "app/utils/date-utilities";

@Injectable({
  providedIn: 'root'
})
export class PageService {

  pageSubject: Subject<string> = new BehaviorSubject<string>("calendar");
  page: string;

  getCurrentPage(): Observable<string | null> {
    return this.pageSubject.asObservable();
  }

  setCurrentPage(page: string) {
    this.pageSubject.next(page);
  }

  unsubscribe(): void {
    this.pageSubject.next(null);
    this.page = "calendar";
  }
}
