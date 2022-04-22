import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.css']
})
export class DeclarationComponent implements OnInit {
  
  checked = false;
  declaration = new FormGroup({
    joiningDate : new FormControl(''),
    photo : new FormControl(''),
    place : new FormControl(''),
    date : new FormControl(''),
  })

  constructor(private router : Router) { }

  back(){
    this.router.navigateByUrl('/user/details/other-details');
  }
  
  onSubmit(){
    console.log(this.declaration.value)
  }

  ngOnInit(): void {
  }

}
