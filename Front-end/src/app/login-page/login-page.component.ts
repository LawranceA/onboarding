import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  status='success';
  user=""
  setUser(data:any){
    this.user=data;
  }
  constructor(private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
  }
  onLogin(e:Event)
  {
    e.preventDefault();
    if(this.user == 'employee')
    {
      this.router.navigate(["/user"]);
    }
    else if(this.user == 'admin')
    {
      this.router.navigate(["/admin"])
    }

  }
}
