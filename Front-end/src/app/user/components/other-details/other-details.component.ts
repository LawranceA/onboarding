import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-other-details',
  templateUrl: './other-details.component.html',
  styleUrls: ['./other-details.component.css'],
})
export class OtherDetailsComponent implements OnInit {
  otherDetail = new FormGroup({
    aadhar_card_number: new FormControl(''),
    aadharCard: new FormControl(''),
    pan_card_number: new FormControl(''),
    passport_number: new FormControl(''),
    passport_expire: new FormControl(''),
    panCard: new FormControl(''),
    passportDetails: new FormControl(''),
    covidCertificate: new FormControl(''),
  });

  constructor(private router: Router,private tokenStorage:TokenStorageService,private service:UserDataService) {}

  next() {
    this.router.navigateByUrl('/user/details/declaration');
  }
  back() {
    this.router.navigateByUrl('/user/details/employment-details');
  }
  onSubmit() {
    console.log(this.otherDetail.value);
    this.otherDetail.value.created_at = new Date();
    this.otherDetail.value.updated_at = new Date();
    this.otherDetail.value.updated_by = this.tokenStorage.getName();
    this.otherDetail.value.fk_proof_users_id = this.tokenStorage.getID();
    this.service.addOtherDetails(this.otherDetail).subscribe(data=>{
      console.log(data)
    })
  }
  ngOnInit(): void {}
}
