import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.css'],
})
export class DeclarationComponent implements OnInit {
  data: any;
  display1: any = 'block';
  display2: any = 'none';
  created_at : any;

  checked = false;
  declaration = new FormGroup({
    joiningDate: new FormControl(''),
    place: new FormControl(''),
  });

  constructor(
    private router: Router,
    private service: UserDataService,
    private tokenStorage: TokenStorageService,
    private pipe: DatePipe
  ) {}

  back() {
    this.router.navigateByUrl('/user/details/other-details');
  }

  onSubmit() {
    this.declaration.value.date = this.pipe.transform(new Date(), 'YYYY-MM-dd');
    this.declaration.value.created_at = new Date();
    this.declaration.value.updated_at = new Date();
    this.declaration.value.updated_by = this.tokenStorage.getName();
    this.declaration.value.fk_declaration_users_id = this.tokenStorage.getID();
    this.service.addDeclaration(this.declaration.value).subscribe((data) => {
      console.log(data);
    });
    this.display1 = 'none';
    this.display2 = 'block';
    console.log(this.declaration.value);
  }

  onUpdate() {
    this.declaration.value.date = this.pipe.transform(new Date(), 'YYYY-MM-dd');
    this.declaration.value.created_at = this.created_at;
    this.declaration.value.updated_at = new Date();
    this.declaration.value.updated_by = this.tokenStorage.getName();
    this.declaration.value.fk_declaration_users_id = this.tokenStorage.getID();
    this.service
      .putDeclaration(this.declaration.value, this.tokenStorage.getID())
      .subscribe((data) => {
        console.log(data);
      });
    console.log(this.declaration.value);
  }

  ngOnInit(): void {
    this.service.getDeclaration(this.tokenStorage.getID()).subscribe((data) => {
      if (data != undefined) {
        this.display1 = 'none';
        this.display2 = 'block';
      }
      if (data != null) {
        this.created_at = data.created_at
        this.declaration.controls['joiningDate'].setValue(data.joining_date);
        this.declaration.controls['place'].setValue(data.place);
      }
    });
  }
}
