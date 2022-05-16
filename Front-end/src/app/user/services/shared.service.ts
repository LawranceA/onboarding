import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Injectable({
  providedIn: 'any',
})
export class SharedService {
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

  postOrganization(data: any) {
    return this.http.post<any>(`${this.api}/addEmployment`, data, {
      headers: this.header,
    });
  }

  getOrganization(id: any) {
    return this.http.get<any>(`${this.api}/getEmployment/${id}`, {
      headers: this.header,
    });
  }

  putOrganization(data: any, id: number) {
    console.log('update route');
    return this.http.put<any>(`${this.api}/updateEmployment/${id}`, data, {
      headers: this.header,
    });
  }

  deleteOrganization(id: number) {
    return this.http.delete<any>(`${this.api}/deleteEmployment/${id}`, {
      headers: this.header,
    });
  }
}
