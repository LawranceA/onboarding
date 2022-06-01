import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { UserDataService } from '../user/services/user-data.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute,private service:AuthServiceService) { }
email=''
  ngOnInit(): void {
  }
  clickHandler(){
    this.router.navigate([`../`]);
  }
  next(){
    console.log(this.email)
    localStorage.setItem("mail",this.email)
    this.service.forgotPasswordMail({email:this.email}).subscribe(data=>{
      console.log(data)
      if (data.message=="Password Updated successfully"){
        this.router.navigate([`../createPassword`]);
      }
    })
  }
}
