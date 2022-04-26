import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from '../../admin';
import { AdminServiceService } from '../../admin-service.service';


@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {
  admin:Admin=new Admin();
  
  constructor(private router:Router,private route:ActivatedRoute, private service:AdminServiceService) { }
  regForm=new FormGroup({
    id:new FormControl('',Validators.required),
    name:new FormControl('',[Validators.required,Validators.minLength(3)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    phone_number:new FormControl('',[Validators.required,Validators.maxLength(10),Validators.pattern("^[6-9]{1}[0-9]{9}$")]),
    designation:new FormControl('',Validators.required),
  })
  ngOnInit(): void {
   
  }
  addAdmin(){
    this.service.createAdmin(this.admin).subscribe(data=>{
      console.log(data)
    })
  }
  register(e:Event){
    e.preventDefault()
    this.admin=this.regForm.value
    console.log(this.regForm.status)
    this.addAdmin()
  }
  
}