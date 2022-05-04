import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registration-status',
  templateUrl: './registration-status.component.html',
  styleUrls: ['./registration-status.component.css']
})
export class RegistrationStatusComponent implements OnInit {
  status='register success';
  user='Employeee'
  constructor(private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
  }
  returnBack(){
    this.router.navigate(['../'],{relativeTo:this.route})
  }
}
