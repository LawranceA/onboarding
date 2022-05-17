import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserDataService } from '../../services/user-data.service';


@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.css']
})
export class DeclarationComponent implements OnInit {
  
  checked = false;
  declaration = new FormGroup({
    joiningDate : new FormControl(''),
    place : new FormControl(''),
    date : new FormControl(''),
  })

  constructor(private router : Router,private service:UserDataService,private tokenStorage:TokenStorageService) { }

  back(){
    this.router.navigateByUrl('/user/details/other-details');
  }
  
  onSubmit(){
    this.declaration.value.created_at = new Date();
    this.declaration.value.updated_at = new Date();
    this.declaration.value.updated_by = this.tokenStorage.getName();
    this.declaration.value.fk_declaration_users_id = this.tokenStorage.getID();
    this.service.addDeclaration(this.declaration).subscribe(data=>{
      console.log(data)
    })
    console.log(this.declaration.value)
  }

  ngOnInit(): void {
  }

}
