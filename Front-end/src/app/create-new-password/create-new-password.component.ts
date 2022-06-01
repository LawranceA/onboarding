import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-create-new-password',
  templateUrl: './create-new-password.component.html',
  styleUrls: ['./create-new-password.component.css']
})
export class CreateNewPasswordComponent implements OnInit {

  constructor(private router:Router, private service:AuthServiceService) { }
  changeForm = new FormGroup({

    autoPass: new FormControl('', [Validators.required,Validators.pattern("^([a-zA-Z0-9@*#^&%!]{8,15})$")]),
    password: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {
  }
  submit(){
    this.changeForm.value.email=localStorage.getItem("mail")
    this.service.checkNupdatePass(this.changeForm.value).subscribe((data)=>{
      if(data.message=="Password Updated successfully"){
        this.router.navigate([``]);
      }
    })
  }
  clickHandler(){
    
    this.router.navigate([`../ForgotPassword`]);
  }
}
