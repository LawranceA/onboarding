import { Injectable } from '@angular/core';
import { UserModule } from '../user.module';

@Injectable({
  providedIn: 'any'
})
export class SharedService {

  constructor() { }

  formData : object[] = []

  setFormData(data : object){
    this.formData.push(data)
  }

  getFormData(){
    return this.formData
  }
  
}
