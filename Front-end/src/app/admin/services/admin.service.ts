import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  userStatus = {
    status: '',
    user: '',
  };
  constructor(
    private tokenStorage: TokenStorageService,
    private http: HttpClient
  ) {}
  setStatus(data: any) {
    this.userStatus.status = data.status;
    this.userStatus.user = data.user;
  }

  getStatus() {
    return this.userStatus;
  }

  private header = new HttpHeaders({
    'x-access-token': `${this.tokenStorage.getToken()}`,
    'Access-Control-Allow-Origin': '*',
  });

  private api =
    'http://onboarding-backend.southindia.cloudapp.azure.com:1337/api';
  addEmployee(data: Object): Observable<any> {
    return this.http.post(`${this.api}/addUser`, data, {
      headers: this.header,
    });
  }

  addAdmin(data: Object): Observable<any> {
    return this.http.post(`${this.api}/addAdmin`, data, {
      headers: this.header,
    });
  }

  //add the remaining codes
  
}
