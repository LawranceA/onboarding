import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'any',
})
export class SharedService {
  constructor(private http: HttpClient) {}

  postOrganization(data: any) {
    return this.http.post<any>('http://localhost:3000/organizations/', data);
  }

  getOrganization() {
    return this.http.get<any>('http://localhost:3000/organizations/');
  }

  putOrganization(data: any, id: number) {
    return this.http.put<any>(
      'http://localhost:3000/organizations/' + id,
      data
    );
  }

  deleteOrganization(id: number) {
    return this.http.delete<any>('http://localhost:3000/organizations/' + id);
  }
}
