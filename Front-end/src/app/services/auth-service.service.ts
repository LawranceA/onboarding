import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  avatar = { name: '', designation: '' };

  setAvatar(data: any) {
    this.avatar.name = data.name;
    this.avatar.designation = data.designation;
  }

  getAvatar() {
    return this.avatar;
  }
  private header = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
  });
  //base api
  private api =
    'http://onboarding-backend.southindia.cloudapp.azure.com:1337/api';
  constructor(private httpClient: HttpClient) {}
  //posting log in credentials and receiving token
  login(username: string, password: string, role: string): Observable<any> {
    return this.httpClient.post(
      `${this.api}/login`,
      { email: username, password: password, role: role },
      { headers: this.header }
    );
  }forgotPasswordMail(data:any):Observable<any>{

    return this.httpClient.post(`${this.api}/forgotPasswordMailed`, data, {
        headers: this.header,
      });
    }
}
