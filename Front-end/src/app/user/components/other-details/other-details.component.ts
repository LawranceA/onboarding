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
  type_of_account = ['Current Account', 'Savings Account', 'Salary Account'];

  today = new Date();

  display1: any = 'block';
  display2: any = 'none';
  created_at: any;
  //formData
  form = new FormData();
  pancard = '';
  aadhar = '';
  passport = '';
  covid = '';
  otherDetail = new FormGroup({
    aadhar_card_number: new FormControl('', [
      Validators.required,
      Validators.pattern('^[2-9]{1}[0-9]{3}\\s{1}[0-9]{4}\\s{1}[0-9]{4}$'),
    ]),
    aadharCard: new FormControl('', [
      Validators.required,
      Validators.pattern('(.*?).(pdf)$'),
    ]),
    adhSrc: new FormControl(''),
    pan_card_number: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$'),
    ]),
    panCard: new FormControl('', [
      Validators.required,
      Validators.pattern('(.*?).(pdf)$'),
    ]),
    panSrc: new FormControl(''),
    passport_number: new FormControl('', [
      Validators.pattern('^[A-PR-WYa-pr-wy][1-9]\\d\\s?\\d{4}[1-9]$'),
    ]),
    passport_expire: new FormControl(''),
    passportDetails: new FormControl('', Validators.pattern('(.*?).(pdf)$')),
    pasSrc: new FormControl(''),
    covidCertificate: new FormControl('', [
      Validators.required,
      Validators.pattern('(.*?).(pdf)$'),
    ]),
    covidSrc: new FormControl(''),
    acc_holder_name: new FormControl('', [
      Validators.required,
      this.validation.characterValidator,
    ]),
    bank_name: new FormControl('', [
      Validators.required,
      this.validation.characterValidator,
    ]),
    acc_number: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{9,18}$'),
    ]),
    ifsc_code: new FormControl('', [
      Validators.required,
      Validators.pattern('[A-Z]{4}[0][0-9]{6}'),
    ]),
    type_of_acc: new FormControl('', Validators.required),
    pf_acc: new FormControl('', [
      Validators.pattern(
        '^([A-Z]{2}[/])([A-Z]{3}[/])([0-9]{1,7}[/])([0-9]{3}[/])([0-9]{1,7})$'
      ),
    ]),
    uan_acc: new FormControl('', Validators.minLength(12)),
  });

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private service: UserDataService,
    private pipe: DatePipe,
    public validation: CustomValidationService
  ) {}
  ngOnInit(): void {
    this.service
      .getOtherDetails(this.tokenStorage.getID())
      .subscribe((data) => {
        this.created_at = data[0].created_at;
        console.log(data);
        if (data.length != 0) {
          this.display1 = 'none';
          this.display2 = 'block';
          this.otherDetail.controls['acc_holder_name'].setValue(
            data[1].account_holder_name
          );
          this.otherDetail.controls['bank_name'].setValue(data[1].bank_name);
          this.otherDetail.controls['acc_number'].setValue(
            data[1].account_number
          );
          this.otherDetail.controls['ifsc_code'].setValue(data[1].ifsc_code);
          this.otherDetail.controls['type_of_acc'].setValue(
            data[1].account_type
          );
          this.otherDetail.controls['pf_acc'].setValue(
            data[1].pf_account_number
          );
          this.otherDetail.controls['uan_acc'].setValue(
            data[1].uan_account_number
          );
          this.created_at = data[0].created_at;
          this.otherDetail.controls['passport_number'].setValue(
            data[0].passport_number
          );
          this.otherDetail.controls['passport_expire'].setValue(
            data[0].passport_expire_date
          );
          this.otherDetail.controls['aadhar_card_number'].setValue(
            data[0].aadhar_card_number
          );
          console.log(data[0].aadhar);
          this.otherDetail.controls['pan_card_number'].setValue(
            data[0].pan_card_number
          );
          // this.pancard=data[0].pan_card;
          // this.aadhar=data[0].aadhar;
          // this.passport=data[0].passport
          // this.covid=data[0].covid_certificate
          this.otherDetail.patchValue({
            aadharCard: data[0].aadhar,
          });
          this.otherDetail.patchValue({
            panCard: data[0].pan_card,
          });
          this.otherDetail.patchValue({
            passportDetails: data[0].passport,
          });
          this.otherDetail.patchValue({
            covidCertificate: data[0].covid_certificate,
          });
        }
      });
  }
  next() {
    this.router.navigateByUrl('/user/details/declaration');
  }
  back() {
    this.router.navigateByUrl('/user/details/employment-details');
  }
  onSubmit() {
    this.appendForms();
    this.service.addOtherDetails(this.form).subscribe((data) => {
      console.log(data);
    });
    this.display1 = 'none';
    this.display2 = 'block';
  }

  get m() {
    return this.otherDetail.controls;
  }
  onUpdate() {
    this.setForms();
    this.form.set('created_at', this.created_at);
    if (typeof this.otherDetail.value.passport_expire != 'string') {
      let passport_expire = `${
        this.otherDetail.value.passport_expire._i.year
      }-${this.otherDetail.value.passport_expire._i.month + 1}-${
        this.otherDetail.value.passport_expire._i.date
      }`;
      this.form.set(
        'passport_expire',
        `${this.pipe.transform(passport_expire, 'YYYY-MM-dd')}`
      );
    } else {
      this.form.set(
        'passport_expire',
        this.otherDetail.get('passport_expire')?.value
      );
    }
    this.service
      .putOtherDetails(this.form, this.tokenStorage.getID())
      .subscribe((data) => {
        console.log(data);
      });
  }
  appendForms() {
    console.log()
    this.form.append(
      'aadhar_card_number',
      this.otherDetail.get('aadhar_card_number')?.value
    );
    this.form.append('aadharCard', this.otherDetail.get('adhSrc')?.value);
    this.form.append(
      'pan_card_number',
      this.otherDetail.get('pan_card_number')?.value
    );
    this.form.append('panCard', this.otherDetail.get('panSrc')?.value);
    this.form.append(
      'passport_number',
      this.otherDetail.get('passport_number')?.value
    );
if(this.otherDetail.value.passport_expire!=''){
  let passport_expire = `${this.otherDetail.value.passport_expire._i.year}-${
    this.otherDetail.value.passport_expire._i.month + 1
  }-${this.otherDetail.value.passport_expire._i.date}`;
  this.form.append(
    'passport_expire',
    `${this.pipe.transform(passport_expire, 'YYYY-MM-dd')}`
  );
}
    this.form.append('passportDetails', this.otherDetail.get('pasSrc')?.value);
    this.form.append(
      'covidCertificate',
      this.otherDetail.get('covidSrc')?.value
    );
    this.form.append(
      'acc_holder_name',
      this.otherDetail.get('acc_holder_name')?.value
    );
    this.form.append('bank_name', this.otherDetail.get('bank_name')?.value);
    this.form.append('acc_number', this.otherDetail.get('acc_number')?.value);
    this.form.append('ifsc_code', this.otherDetail.get('ifsc_code')?.value);
    this.form.append('type_of_acc', this.otherDetail.get('type_of_acc')?.value);
    this.form.append('pf_acc', this.otherDetail.get('pf_acc')?.value);
    this.form.append('uan_acc', this.otherDetail.get('uan_acc')?.value);
    this.form.append('updated_at', `${new Date()}`);
    this.form.append('updated_by', this.tokenStorage.getName());
    this.form.append('created_at', `${new Date()}`);
    this.form.append('fk_proof_users_id', this.tokenStorage.getID());
  }
  setForms() {
    this.form.set(
      'aadhar_card_number',
      this.otherDetail.get('aadhar_card_number')?.value
    );
    this.form.set('aadharCard', this.otherDetail.get('adhSrc')?.value);
    this.form.set(
      'pan_card_number',
      this.otherDetail.get('pan_card_number')?.value
    );
    this.form.set('panCard', this.otherDetail.get('panSrc')?.value);
    this.form.set(
      'passport_number',
      this.otherDetail.get('passport_number')?.value
    );
    this.form.set('passportDetails', this.otherDetail.get('pasSrc')?.value);
    this.form.set('covidCertificate', this.otherDetail.get('covidSrc')?.value);
    this.form.set(
      'acc_holder_name',
      this.otherDetail.get('acc_holder_name')?.value
    );
    this.form.set('bank_name', this.otherDetail.get('bank_name')?.value);
    this.form.set('acc_number', this.otherDetail.get('acc_number')?.value);
    this.form.set('ifsc_code', this.otherDetail.get('ifsc_code')?.value);
    this.form.set('type_of_acc', this.otherDetail.get('type_of_acc')?.value);
    this.form.set('pf_acc', this.otherDetail.get('pf_acc')?.value);
    this.form.set('uan_acc', this.otherDetail.get('uan_acc')?.value);
    this.form.set('updated_at', `${new Date()}`);
    this.form.set('updated_by', this.tokenStorage.getName());
    this.form.set('fk_proof_users_id', this.tokenStorage.getID());
  }
  fileChange(e: any, control: any) {
    console.log(e.target.files);
    let extensionAllowed = { png: true, jpeg: true };
    const file = e.target.files[0];
    if (e.target.files[0].size / 1024 / 1024 > 1) {
      alert('File size should be less than 1MB');
      return;
    }
    if (control == 'adh') {
      this.otherDetail.patchValue({
        adhSrc: file,
      });
      this.otherDetail.patchValue({
        aadharCard: file.name,
      });
      this.otherDetail.get('adhSrc')?.updateValueAndValidity();
    } else if (control == 'pan') {
      this.otherDetail.patchValue({
        panSrc: file,
      });
      this.otherDetail.patchValue({
        panCard: file.name,
      });
      this.otherDetail.get('panSrc')?.updateValueAndValidity();
    } else if (control == 'pass') {
      this.otherDetail.patchValue({
        pasSrc: file,
      });
      this.otherDetail.patchValue({
        passportDetails: file.name,
      });
      this.otherDetail.get('pasSrc')?.updateValueAndValidity();
    } else if (control == 'covid') {
      this.otherDetail.patchValue({
        covidSrc: file,
      });
      this.otherDetail.patchValue({
        covidCertificate: file.name,
      });
      this.otherDetail.get('covidSrc')?.updateValueAndValidity();
    }
  }
}
