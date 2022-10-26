import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SERVER_API_URL } from 'app.constants';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  constructor(private httpClient: HttpClient) {}

  exportWorkdayMonth(year: number, month: number, userId: number): Observable<Blob> {
    const params = { year: year, month: month };
    return this.httpClient.get(`${SERVER_API_URL}/export/${userId}/excel`, { params: params, responseType: 'blob' });
  }

  exportAndSendByEmail(
    year: number,
    month: number,
    userId: number,
    recipients: string[]
  ): Observable<HttpResponse<{}>> {
    const params = { year: year, month: month };
    return this.httpClient.post<string[]>(`${SERVER_API_URL}/export/${userId}/email`, recipients, {
      params: params,
      observe: 'response',
    });
  }
}
