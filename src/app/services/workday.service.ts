import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {SERVER_API_URL} from "app.constants";
import {Workday} from "app/models/workday.model";

@Injectable({
  providedIn: 'root'
})
export class WorkdayService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  findWorkdaysByUsername(username: string, fromDate: string, toDate: string): Observable<Workday[]> {
    const params = {username: username, fromDate: fromDate, toDate: toDate}
    return this.httpClient.get<Workday[]>(`${SERVER_API_URL}/workday`, {params: params});
  }

  findWorkdayById(id: number): Observable<Workday> {
    return this.httpClient.get<Workday>(`${SERVER_API_URL}/workday/${id}`);
  }

  createWorkday(workday: Workday): Observable<HttpResponse<Workday>> {
    return this.httpClient.post<Workday>(`${SERVER_API_URL}/workday/new`, workday, {observe: 'response'});
  }

  editWorkday(workday: Workday): Observable<HttpResponse<Workday>> {
    return this.httpClient.put<Workday>(`${SERVER_API_URL}/workday/edit`, workday, {observe: 'response'});
  }

  deleteWorkday(workdayId: number, usernameId: number): Observable<HttpResponse<{}>> {
    return this.httpClient.delete(`${SERVER_API_URL}/workday/${usernameId}/delete/${workdayId}`, {observe: 'response'});
  }

}
