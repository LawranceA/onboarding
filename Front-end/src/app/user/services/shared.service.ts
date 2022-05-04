import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
<<<<<<< HEAD

@Injectable({
  providedIn: 'any',
=======
import { FormGroup } from '@angular/forms';
import { UserModule } from '../user.module';

@Injectable({
  providedIn: 'root'
>>>>>>> fefd1d0b77306d0dbec0a0499dc91ae5230a92e7
})
export class SharedService {
  constructor(private http: HttpClient) {}

<<<<<<< HEAD
  postOrganization(data: any) {
    return this.http.post<any>('http://localhost:3000/organizations/', data);
=======
  constructor() { }

  formData:Object[]=[]

  setFormData(data : FormGroup){
    this.formData.push(data.value)
    console.log("pushed")
>>>>>>> fefd1d0b77306d0dbec0a0499dc91ae5230a92e7
  }
getData(){

<<<<<<< HEAD
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
=======
  return this.formData
}
  
>>>>>>> fefd1d0b77306d0dbec0a0499dc91ae5230a92e7
}
