import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class Dialog10serviceService {
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  private header = new HttpHeaders({
    'x-access-token': `${this.tokenStorage.getToken()}`,
    'Access-Control-Allow-Origin': '*',
  });
  private api =
    'http://onboarding-backend.southindia.cloudapp.azure.com:1337/api';

  postEducation(data: any): Observable<any> {
    return this.http.post<any>(`${this.api}/addEducation`, data, {
      headers: this.header,
    });
  }
  getEducation(id: any): Observable<any> {
    return this.http.get<any>(`${this.api}/getEducation/${id}`, {
      headers: this.header,
    });
  }
  putEduaction(data: any, id: number): Observable<any> {
    return this.http.put<any>(`${this.api}/updateEducation/${id}`, data, {
      headers: this.header,
    });
  }
  deleteEducation(id: number): Observable<any> {
    return this.http.delete<any>(`${this.api}/deleteEducation/${id}`, {
      headers: this.header,
    });
  }
}
