import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(
    private tokenStorage: TokenStorageService,
    private http: HttpClient
  ) {}

  private header = new HttpHeaders({
    'x-access-token': JSON.stringify(this.tokenStorage.getToken),
    'Access-Control-Allow-Origin': '*',
  });
  private api =
    'http://onboarding-backend.southindia.cloudapp.azure.com:1337/api';
  addPersonalInfo(data: any): Observable<any> {
    return this.http.post(`${this.api}/addPersonalInfo`, data, {
      headers: this.header,
    });
  }
}
