import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-new-password',
  templateUrl: './create-new-password.component.html',
  styleUrls: ['./create-new-password.component.css']
})
export class CreateNewPasswordComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  clickHandler(){
    this.router.navigate([`../ForgotPassword`]);
  }
}
