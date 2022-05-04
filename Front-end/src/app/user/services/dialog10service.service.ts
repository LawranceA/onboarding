import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'any'
})
export class Dialog10serviceService {

  constructor(private http : HttpClient) { }

  postEducation(data : any){
    return this.http.post<any>("http://localhost:3000/educationList/",data)
  }

  getEducation(){
    return this.http.get<any>("http://localhost:3000/educationList/")
  }

  putEduaction(data: any,id: number){
    return this.http.put<any>("http://localhost:3000/educationList/"+id,data)
  }

  deleteEducation(id : number){
    return this.http.delete<any>("http://localhost:3000/educationList/"+id)
  }
}
