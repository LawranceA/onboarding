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
    'x-access-token': `${this.tokenStorage.getToken()}`,
    'Access-Control-Allow-Origin': '*',
  });
  private api =
    'http://onboarding-backend.southindia.cloudapp.azure.com:1337/api';
  addPersonalInfo(data: Object): Observable<Object> {
    console.log(JSON.stringify(this.tokenStorage.getToken()));
    return this.http.post(`${this.api}/addPersonalInfo`, data, {
      headers: this.header,
    });
  }

  addAddress(data: Object): Observable<Object> {
    console.log(JSON.stringify(this.tokenStorage.getToken()));
    return this.http.post(`${this.api}/addAddress`, data, {
      headers: this.header,
    });
  }

  //api for change password
  changePassword(data: Object): Observable<any> {
    console.log('inside changepassword');
    return this.http.post(`${this.api}/changePassword`, data, {
      headers: this.header,
    });
  }

  getPersonalInfoData(id: any) {
    return this.http.get<any>(`${this.api}/getPersonalInfoData/${id}`, {
      headers: this.header,
    });
  }

}
