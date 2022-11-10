import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SERVER_API_URL } from 'app.constants';
import { Workday } from 'app/models/workday.model';
import { Summary } from 'app/models/summary.model';
import { SpecialDay } from 'app/models/special-days';

@Injectable({
  providedIn: 'root',
})
export class WorkdayService {
  constructor(private httpClient: HttpClient) {}

  findWorkdaysByUsername(username: string, fromDate: string, toDate: string): Observable<Workday[]> {
    const params = { username: username, fromDate: fromDate, toDate: toDate };
    return this.httpClient.get<Workday[]>(`${SERVER_API_URL}/workday`, { params: params });
  }

  findWorkdayById(id: number): Observable<Workday> {
    return this.httpClient.get<Workday>(`${SERVER_API_URL}/workday/${id}`);
  }

  createWorkday(workday: Workday): Observable<HttpResponse<Workday>> {
    return this.httpClient.post<Workday>(`${SERVER_API_URL}/workday/new`, workday, { observe: 'response' });
  }

  editWorkday(workday: Workday): Observable<HttpResponse<Workday>> {
    return this.httpClient.put<Workday>(`${SERVER_API_URL}/workday/edit`, workday, { observe: 'response' });
  }

  deleteWorkday(workdayId: number, userId: number): Observable<HttpResponse<{}>> {
    return this.httpClient.delete(`${SERVER_API_URL}/workday/${userId}/delete/${workdayId}`, { observe: 'response' });
  }

  getMonthSummaryData(year: number, month: number, userId: number): Observable<Summary> {
    const params = { year: year, month: month };
    return this.httpClient.get<Summary>(`${SERVER_API_URL}/workday/${userId}/summary`, { params: params });
  }

  getMonthSpecialDays(year: number, month: number) {
    const params = { year: year, month: month };
    return this.httpClient.get<SpecialDay[]>(`${SERVER_API_URL}/workday/special-days`, { params: params });
  }
}
