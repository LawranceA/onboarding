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

  getAllEmployees(): Observable<any> {
    return this.http.get(`${this.api}/getUsers`, {
      headers: this.header,
    });
  }
  getOneEmployees(id: any) {
    return this.http.get<any>(`${this.api}/getUserById/${id}`, {
      headers: this.header,
    });
  }
  addAdminPhoto(data: any) {
    return this.http.put<any>(`${this.api}/addAdminImg`, data, {
      headers: this.header,
    });
  }
  getAdminPhoto(data: any) {
    return this.http.get<any>(`${this.api}/getAdminImg/${data}`,{
      headers: this.header,
    });
  }
  getRecentEmployees(){
    return this.http.get<any>(`${this.api}/getRecentUsers`,{
      headers: this.header,
    })
  }
  deleteEmployee(id:any){
    return this.http.delete<any>(`${this.api}/deleteEmployee/${id}`,{
      headers: this.header,
    })
  }
  getCardTotals(){
    return this.http.get<any>(`${this.api}/getCounts`,{
      headers: this.header,
    })
  }
}
