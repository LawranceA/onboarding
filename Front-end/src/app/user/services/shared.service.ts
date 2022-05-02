import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserModule } from '../user.module';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  formData:Object[]=[]

  setFormData(data : FormGroup){
    this.formData.push(data.value)
    console.log("pushed")
  }
getData(){

  return this.formData
}
  
}
