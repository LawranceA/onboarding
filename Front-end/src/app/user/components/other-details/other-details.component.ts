import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  next() {
    this.router.navigateByUrl('/user/details/declaration');
  }
  back() {
    this.router.navigateByUrl('/user/details/employment-details');
  }
  onSubmit() {
    console.log(this.otherDetail.value);
  }
  ngOnInit(): void {}
}
