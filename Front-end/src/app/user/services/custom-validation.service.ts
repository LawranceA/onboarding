import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {

  constructor() { }
  nameValidator(control: FormControl) {
    let no = control.value;
    let regex = new RegExp('^[a-zA-Z]\\s+$');
    if (!regex.test(no)) {
      return { nameValidator: true };
    } else {
      return null;
    }
  }

  emailValidator(control: FormControl) {
    if (
      /^[a-zA-Z0-9._%+-]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)(?!yahoo.co.in)(?!aol.com)(?!live.com)(?!outlook.com)(?!diggibyte.com)[a-zA-Z0-9_-]+.[a-zA-Z0-9-.]{2,61}$/.test(
        control.value
      )
    ) {
      return { emailValidator: true };
    } else {
      return null;
    }
  }
  pinCodeValidator(control:FormControl){
    let regex = new RegExp("^[0-9]+$");
    if(!regex.test(control.value)){
      return {pinCodeValidator:true}
    }return null;
  }
  characterValidator(control:FormControl){
    let regex = new RegExp('^[a-zA-Z\\s]+$');
    console.log(typeof(control.value))
    if(!regex.test(control.value)){
      return {characterValidator:true}
    }return null;
  }
  percentageValidator(control:FormControl){
    if(!/(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/.test(control.value) || control.value==0 || control.value>100 || (control.value>10 && control.value<=45)){
      return {percentageValidator:true}
    }return null;
  }
  
}