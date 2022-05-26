import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserDataService } from '../../services/user-data.service';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';

import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

import 'moment/locale/ja';

import 'moment/locale/fr';
import { CustomValidationService } from '../../services/custom-validation.service';


@Component({
  selector: 'app-other-details',
  templateUrl: './other-details.component.html',
  styleUrls: ['./other-details.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class OtherDetailsComponent implements OnInit {

  type_of_account = [
    
    'Current Account',
    'Savings Account',
    'Salary Account'
    
  ];

  
  today=new Date();

  display1: any = 'block';
  display2: any = 'none';
  created_at: any;




  otherDetail = new FormGroup({
    aadhar_card_number: new FormControl('',[Validators.required,Validators.pattern("^[2-9]{1}[0-9]{3}\\s{1}[0-9]{4}\\s{1}[0-9]{4}$")]),
    aadharCard: new FormControl('',[Validators.required,Validators.pattern("(.*?)\.(pdf)$")]),
    pan_card_number: new FormControl('',[Validators.required,Validators.pattern("^[A-Z]{5}[0-9]{4}[A-Z]{1}$")]),
    panCard: new FormControl('',[Validators.required,Validators.pattern("(.*?)\.(pdf)$")]),
    passport_number: new FormControl('',[Validators.pattern("/^[A-PR-WYa-pr-wy][1-9]\\d\\s?\\d{4}[1-9]$/")]),
    passport_expire: new FormControl(''),
    passportDetails: new FormControl('',Validators.pattern("(.*?)\.(pdf)$")),
    covidCertificate: new FormControl('',[Validators.required,Validators.pattern("(.*?)\.(pdf)$")]),
    acc_holder_name: new FormControl('',[Validators.required,this.validation.characterValidator]),
    bank_name: new FormControl('',[Validators.required,this.validation.characterValidator]),
    acc_number: new FormControl('',[Validators.required,Validators.pattern("/^[0-9]{9,18}$/")]),
    ifsc_code: new FormControl('',[Validators.required,Validators.pattern("/^[A-Z]{4}0[A-Z0-9]{6}$/")]),
    type_of_acc: new FormControl('',Validators.required),
    pf_acc: new FormControl('',[Validators.pattern('^([A-Z]{2}[/])([A-Z]{3}[/])([0-9]{1,7}[/])([0-9]{3}[/])([0-9]{1,7})$')]),
    uan_acc: new FormControl('',Validators.minLength(12))
   
  });
 
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private service: UserDataService,
    private pipe: DatePipe,
    public validation: CustomValidationService
  ) {}

  next() {
    this.router.navigateByUrl('/user/details/declaration');
  }
  back() {
    this.router.navigateByUrl('/user/details/employment-details');
  }
  onSubmit() {
    console.log(this.otherDetail);
    this.otherDetail.value.created_at = new Date();
    this.otherDetail.value.updated_at = new Date();
    this.otherDetail.value.updated_by = this.tokenStorage.getName();
    this.otherDetail.value.fk_proof_users_id = this.tokenStorage.getID();
    // console.log('other deuaisls');
    this.otherDetail.value.passport_expire = this.pipe.transform(
      this.otherDetail.value.passport_expire,
      'YYYY-MM-dd'
    );
    this.service.addOtherDetails(this.otherDetail.value).subscribe((data) => {
      console.log(data);
    });
    this.display1 = 'none';
    this.display2 = 'block';
  }
  get m(){
    return this.otherDetail.controls;
  }
  onUpdate() {
    this.otherDetail.value.created_at = this.created_at;
    this.otherDetail.value.updated_at = new Date();
    this.otherDetail.value.updated_by = this.tokenStorage.getName();
    this.otherDetail.value.fk_proof_users_id = this.tokenStorage.getID();
    // console.log('other deuaisls');
    this.otherDetail.value.passport_expire = this.pipe.transform(
      this.otherDetail.value.passport_expire,
      'YYYY-MM-dd'
    );
    this.service
      .putOtherDetails(this.otherDetail.value, this.tokenStorage.getID())
      .subscribe((data) => {
        console.log(data);
      });
  }

  ngOnInit(): void {
    this.service
      .getOtherDetails(this.tokenStorage.getID())
      .subscribe((data) => {
        console.log(data);
        if (data != undefined) {
          this.display1 = 'none';
          this.display2 = 'block';
        }
        if (data != null) {
          this.created_at = data.created_at;
          this.otherDetail.controls['passport_number'].setValue(
            data.passport_number
            // console.log(data.passport_number)
          );
          this.otherDetail.controls['passport_expire'].setValue(
            data.passport_expire_date
          );
          this.otherDetail.controls['aadhar_card_number'].setValue(
            data.aadhar_card_number
          );
          this.otherDetail.controls['aadharCard'].setValue(data.aadharCard);
          this.otherDetail.controls['pan_card_number'].setValue(
            data.pan_card_number
          );
          this.otherDetail.controls['panCard'].setValue(data.pan_card);
          this.otherDetail.controls['passportDetails'].setValue(data.passport);
          this.otherDetail.controls['covidCertificate'].setValue(
            data.covid_certificate
          );
        }
      });
  }
  
}