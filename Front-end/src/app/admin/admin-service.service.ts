import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from './admin';


@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  private baseUrl="http://localhost:3000/api"
  constructor(private httpClient:HttpClient) { }
  createAdmin(admin:Admin):Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}/addAdmin`,admin)
  }
}
