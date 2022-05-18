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
  //api for add personal Info
  addPersonalInfo(data: Object): Observable<Object> {
    console.log(JSON.stringify(this.tokenStorage.getToken()));
    return this.http.post(`${this.api}/addPersonalInfo`, data, {
      headers: this.header,
    });
  }
  //api for add address
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
  //api for getting personal_info 
  getPersonalInfoData(id: any) {
    return this.http.get<any>(`${this.api}/getPersonalInfoData/${id}`, {
      headers: this.header,
    });
  }
 
  // api for adding other-details
  addOtherDetails(data:Object){
    return this.http.post(`${this.api}/addDetails`, data, {
      headers: this.header,
    });
  }
 //api for getting other details
  getOtherDetails(id: any) {
    return this.http.get<any>(`${this.api}/getDetails/${id}`, {
      headers: this.header,
    });
  }
   //api for updating other details
   putOtherDetails(data: any, id: number) {
    console.log('update route');
    return this.http.put<any>(`${this.api}/updateDetails/${id}`, data, {
      headers: this.header,
    });
  }
  //api for adding declaration
  addDeclaration(data:Object): Observable<any>{
    return this.http.post(`${this.api}/addDeclaration`, data, {
      headers: this.header,
    });
  }
  //api for getting other details
  getDeclaration(id: any) {
    return this.http.get<any>(`${this.api}/getDeclaration/${id}`, {
      headers: this.header,
    });
  }
   //api for updating other details
   putDeclaration(data: any, id: number) {
    console.log('update route');
    return this.http.put<any>(`${this.api}/updateDeclaration/${id}`, data, {
      headers: this.header,
    });
  }
}
