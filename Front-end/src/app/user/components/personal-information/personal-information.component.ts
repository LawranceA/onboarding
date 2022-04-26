import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormsModule,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css'],
})
export class PersonalInformationComponent implements OnInit {
  genders = ['Male', 'Female', 'Others'];
  cities = ['Bangalore', 'Chennai', 'Hyderabad'];
  states = ['Karnataka', 'TamilNadu', 'AndraPredesh'];
  countries = ['Inida', 'Sweden', 'Ukraine'];

  display: boolean = false;

  personalInformation = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    alternatePhone: new FormControl(''),
    gender: new FormControl('', [Validators.required]),
    photo: new FormControl(''),
    houseNo: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    locality: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [Validators.required]),
    houseNo2: new FormControl('', [Validators.required]),
    street2: new FormControl('', [Validators.required]),
    locality2: new FormControl('', [Validators.required]),
    city2: new FormControl('', [Validators.required]),
    state2: new FormControl('', [Validators.required]),
    country2: new FormControl('', [Validators.required]),
    pincode2: new FormControl('', [Validators.required]),
  });

  // get firstName() {
  //   return this.personalInformation.get('firstName');
  // }

  constructor(private router: Router) {}

  next() {
    this.router.navigateByUrl('/user/details/educational-qualification');
  }

  copy(e: Event) {
    this.display = !this.display;

    if (this.display) {
      this.personalInformation.patchValue({
        houseNo2: this.personalInformation.value.houseNo,
        street2: this.personalInformation.value.street,
        locality2: this.personalInformation.value.locality,
        city2: this.personalInformation.value.city,
        state2: this.personalInformation.value.state,
        country2: this.personalInformation.value.country,
        pincode2: this.personalInformation.value.pincode,
      });
    } else {
      this.personalInformation.patchValue({
        houseNo2: '',
        street2: '',
        locality2: '',
        city2: '',
        state2: '',
        country2: '',
        pincode2: '',
      });
    }
  }
  


  onSubmit() {
   
  }

 

  ngOnInit(): void {


  }

  
}
