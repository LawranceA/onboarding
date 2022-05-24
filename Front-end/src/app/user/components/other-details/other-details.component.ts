import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-other-details',
  templateUrl: './other-details.component.html',
  styleUrls: ['./other-details.component.css'],
})
export class OtherDetailsComponent implements OnInit {

  type_of_account = [
    'Personal Account',
    'Current Account',
    'Savings Account'
    
  ];

  display1: any = 'block';
  display2: any = 'none';
  created_at: any;

  otherDetail = new FormGroup({
    aadhar_card_number: new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$")]),
    aadharCard: new FormControl('',Validators.required),
    pan_card_number: new FormControl('',Validators.required),
    panCard: new FormControl('',Validators.required),
    passport_number: new FormControl(''),
    passport_expire: new FormControl(''),
    passportDetails: new FormControl(''),
    covidCertificate: new FormControl('',Validators.required),
    acc_holder_name: new FormControl('',Validators.required),
    bank_name: new FormControl('',Validators.required),
    acc_number: new FormControl('',Validators.required),
    ifsc_code: new FormControl('',[Validators.required,Validators.pattern("^[A-Z]{4}0[A-Z0-9]{6}$")]),
    type_of_acc: new FormControl('',Validators.required),
    pf_acc: new FormControl(''),
    uan_acc: new FormControl('')
   
  });
 
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private service: UserDataService,
    private pipe: DatePipe
  ) {}

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
  getErrorMessage() {
    // console.log('entering');
    if (
      
      this.otherDetail.get('aadharCard')?.getError('required') ||
      this.otherDetail.get('pan_card_number')?.getError('required') ||
      this.otherDetail.get('panCard')?.getError('required') ||
      this.otherDetail.get('acc_holder_name')?.getError('required') ||
      this.otherDetail.get('bank_name')?.getError('required') ||
      this.otherDetail.get('acc_number')?.getError('required') ||
      this.otherDetail.get('ifsc_code')?.getError('required') ||
      this.otherDetail.get('type_of_acc')?.getError('required')
      
     
    ) {
      return 'You must enter a value';
    }
    if (
      this.otherDetail.get('covidCertificate')?.getError('required')) {
      return 'Please select a file';
    }
    if( this.otherDetail.get('ifsc_code')?.getError('pattern'))
    {
      return 'Please enter Valid IFSC Code';
    }
    return '';
    
  }
  getaadharErrorMessage()
  {
    
    if(this.otherDetail.get('aadhar_card_number')?.getError('required'))
    {
      return 'You must enter a value';
    }
    if( this.otherDetail.get('aadhar_card_number')?.getError('pattern') )
    {
      return 'Enter only numbers';
    }
      return '';

  }
 
}