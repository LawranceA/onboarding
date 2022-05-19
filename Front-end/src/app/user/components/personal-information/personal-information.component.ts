import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormsModule,
  FormGroup,
  Validators,
  FormControl,
  ValidatorFn,
} from '@angular/forms';
import { DatePipe, formatDate, JsonPipe } from '@angular/common';
import { filter } from 'rxjs';
import { personalInfo } from '../../structure/personal-info';
import { Address } from '../../structure/address';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css'],
})
export class PersonalInformationComponent implements OnInit {
  data: any;
  display1: any = 'block';
  display2: any = 'none';
  created_at: any;

  genders = ['Male', 'Female', 'Others'];
  cities = [
    'Port Blair',
    'Amaravati',
    'Itanagar',
    'Dispur',
    'Patna',
    'Chandigarh',
    'Naya Raipur',
    'Daman',
    'Daman',
    'New Delhi',
    'Panaji',
    'Gandhinagar',
    'Chandigarh',
    'Shimla',
    'Srinagar (Summer), Jammu(Winter)',
    'Ranchi',
    'Bangalore',
    'Thiruvananthapuram',
    'Kavaratti',
    'Bhopal',
    'Mumbai',
    'Imphal',
    'Shillong',
    'Aizawl',
    'Kohima',
    'Bhubaneswar',
    'Puducherry',
    'Chandigarh',
    'Jaipur',
    'Gangtok',
    'Chennai',
    'Agartala',
    'Lucknow',
    'Dehradun, Gairsain (Summer)',
    'Kolkata',
  ];
  states = [
    'Andaman & Nicobar',
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chandigarh',
    'Chhattisgarh',
    'Dadra & Nagar Haveli',
    'Daman & Diu',
    'Delhi',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu & Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Lakshadweep',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Orissa',
    'Pondicherry',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Tripura',
    'Uttar Pradesh',
    'Uttaranchal',
    'West Bengal',
  ];
  countries = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'American Samoa',
    'Andorra',
    'Angola',
    'Anguilla',
    'Antarctica',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Aruba',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bermuda',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegowina',
    'Botswana',
    'Bouvet Island',
    'Brazil',
    'British Indian Ocean Territory',
    'Brunei Darussalam',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Cape Verde',
    'Cayman Islands',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Christmas Island',
    'Cocos (Keeling) Islands',
    'Colombia',
    'Comoros',
    'Congo',
    'Congo, the Democratic Republic of the',
    'Cook Islands',
    'Costa Rica',
    "Cote d'Ivoire",
    'Croatia (Hrvatska)',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'East Timor',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Ethiopia',
    'Falkland Islands (Malvinas)',
    'Faroe Islands',
    'Fiji',
    'Finland',
    'France',
    'France Metropolitan',
    'French Guiana',
    'French Polynesia',
    'French Southern Territories',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Gibraltar',
    'Greece',
    'Greenland',
    'Grenada',
    'Guadeloupe',
    'Guam',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Heard and Mc Donald Islands',
    'Holy See (Vatican City State)',
    'Honduras',
    'Hong Kong',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran (Islamic Republic of)',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    "Korea, Democratic People's Republic of",
    'Korea, Republic of',
    'Kuwait',
    'Kyrgyzstan',
    "Lao, People's Democratic Republic",
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libyan Arab Jamahiriya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macau',
    'Macedonia, The Former Yugoslav Republic of',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Martinique',
    'Mauritania',
    'Mauritius',
    'Mayotte',
    'Mexico',
    'Micronesia, Federated States of',
    'Moldova, Republic of',
    'Monaco',
    'Mongolia',
    'Montserrat',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'Netherlands Antilles',
    'New Caledonia',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'Niue',
    'Norfolk Island',
    'Northern Mariana Islands',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Pitcairn',
    'Poland',
    'Portugal',
    'Puerto Rico',
    'Qatar',
    'Reunion',
    'Romania',
    'Russian Federation',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia (Slovak Republic)',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Georgia and the South Sandwich Islands',
    'Spain',
    'Sri Lanka',
    'St. Helena',
    'St. Pierre and Miquelon',
    'Sudan',
    'Suriname',
    'Svalbard and Jan Mayen Islands',
    'Swaziland',
    'Sweden',
    'Switzerland',
    'Syrian Arab Republic',
    'Taiwan, Province of China',
    'Tajikistan',
    'Tanzania, United Republic of',
    'Thailand',
    'Togo',
    'Tokelau',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Turks and Caicos Islands',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States',
    'United States Minor Outlying Islands',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Venezuela',
    'Vietnam',
    'Virgin Islands (British)',
    'Virgin Islands (U.S.)',
    'Wallis and Futuna Islands',
    'Western Sahara',
    'Yemen',
    'Yugoslavia',
    'Zambia',
    'Zimbabwe',
  ];

  display: boolean = false;

  personalInformation = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    personal_email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    mobile_number: new FormControl('', [
      // // Validators.required,
      // // Validators.maxLength(10),
      // // Validators.pattern('^[6-9]{1}[0-9]{9}$'),
      // this.numberValidation
    ]),
    alternate_number: new FormControl('', [
      // Validators.required,
      // Validators.maxLength(10),
      // Validators.pattern('^[6-9]{1}[0-9]{9}$'),
    ]),
    gender: new FormControl('', [Validators.required]),
    photo: new FormControl('', [Validators.required]),
    current: new FormGroup({
      house_no: new FormControl('', [Validators.required]),
      street: new FormControl(''),
      locality: new FormControl(''),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [Validators.required]),
    }),
    permanent: new FormGroup({
      house_no: new FormControl('', [Validators.required]),
      street: new FormControl(''),
      locality: new FormControl(''),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [Validators.required]),
    }),
  });

  personal_info: personalInfo = new personalInfo();
  currentAddress: any;
  permanentAddres: any;

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private userService: UserDataService,
    private pipe: DatePipe
  ) {}

  next() {
    this.router.navigateByUrl('/user/details/educational-qualification');
  }

  copy(e: Event) {
    this.display = !this.display;

    if (this.display) {
      this.personalInformation.patchValue({
        permanent: {
          house_no: this.personalInformation.value.current.house_no,
          street: this.personalInformation.value.current.street,
          locality: this.personalInformation.value.current.locality,
          city: this.personalInformation.value.current.city,
          state: this.personalInformation.value.current.state,
          country: this.personalInformation.value.current.country,
          pincode: this.personalInformation.value.current.pincode,
        },
      });
    } else {
      this.personalInformation.patchValue({
        permanent: {
          house_no: '',
          street: '',
          locality: '',
          city: '',
          state: '',
          country: '',
          pincode: '',
        },
      });
    }
  }
  addPersonalInfoData() {
    this.personal_info.first_name = this.personalInformation.value.first_name;
    this.personal_info.last_name = this.personalInformation.value.last_name;
    this.personal_info.personal_email =
      this.personalInformation.value.personal_email;
    this.personal_info.mobile_number =
      this.personalInformation.value.mobile_number;
    this.personal_info.alternate_number =
      this.personalInformation.value.alternate_number;
    this.personal_info.gender = this.personalInformation.value.gender;
    this.personal_info.dob = this.pipe.transform(
      this.personalInformation.value.dob,
      'YYYY-MM-dd'
    );
    this.personal_info.photo = this.personalInformation.value.photo;
    this.personal_info.created_at = new Date();
    this.personal_info.updated_at = new Date();
    this.personal_info.updated_by = this.tokenStorage.getName();
    this.personal_info.fk_person_users_id = this.tokenStorage.getID();
    // console.log(this.personal_info.created_at);
  }
  addCurrentAddress() {
    this.personalInformation.value.current.type = 'current';
    this.personalInformation.value.current.created_at = new Date();
    this.personalInformation.value.current.updated_at = new Date();
    this.personalInformation.value.current.updated_by =
      this.tokenStorage.getName();
    this.personalInformation.value.current.fk_address_users_id =
      this.tokenStorage.getID();
    this.currentAddress = this.personalInformation.value.current;
    // console.log(this.currentAddress);
  }
  addPermanentAddress() {
    this.personalInformation.value.permanent.type = 'permanent';
    this.personalInformation.value.permanent.created_at = new Date();
    this.personalInformation.value.permanent.updated_at = new Date();
    this.personalInformation.value.permanent.updated_by =
      this.tokenStorage.getName();
    this.personalInformation.value.permanent.fk_address_users_id =
      this.tokenStorage.getID();
    this.permanentAddres = this.personalInformation.value.permanent;
    // console.log(this.permanentAddres);
  }
  onSubmit() {
    console.log(this.personalInformation);
    this.display1 = 'none';
    this.display2 = 'block';
    this.addPersonalInfoData();
    this.addCurrentAddress();
    this.addPermanentAddress();
    this.userService.addPersonalInfo(this.personal_info).subscribe((data) => {
      console.log(data);
    });
    this.userService.addAddress(this.currentAddress).subscribe((data) => {
      console.log(data);
    });
    this.userService.addAddress(this.permanentAddres).subscribe((data) => {
      console.log(data);
    });
  }
  //  update personal DATA
  onUpdate() {
    this.addPersonalInfoData();
    this.addCurrentAddress();
    this.addPermanentAddress();
    this.personal_info.created_at = this.created_at;

    this.userService.addPersonalInfo(this.personal_info).subscribe((data) => {
      console.log(data);
    });
    this.userService.addAddress(this.currentAddress).subscribe((data) => {
      console.log(data);
    });
    this.userService.addAddress(this.permanentAddres).subscribe((data) => {
      console.log(data);
    });
  }

  ngOnInit(): void {
    this.userService
      .getPersonalInfoData(this.tokenStorage.getID())
      .subscribe((res) => {
        this.data = res;
        console.log(this.data);
        if (res[0].address.length != 0) {
          this.display1 = 'none';
          this.display2 = 'block';
        }
        if (res[0].address.length != 0) {
          this.created_at = res[0].personal_info.created_at;
          this.personalInformation.controls['first_name'].setValue(
            this.data[0].personal_info.first_name
          );
          this.personalInformation.controls['last_name'].setValue(
            this.data[0].personal_info.last_name
          );
          this.personalInformation.controls['dob'].setValue(
            this.data[0].personal_info.dob
          );
          this.personalInformation.controls['personal_email'].setValue(
            this.data[0].personal_info.personal_email
          );
          this.personalInformation.controls['mobile_number'].setValue(
            this.data[0].personal_info.mobile_number
          );
          this.personalInformation.controls['alternate_number'].setValue(
            this.data[0].personal_info.alternate_number
          );
          this.personalInformation.controls['gender'].setValue(
            this.data[0].personal_info.gender
          );
          // this.personalInformation.controls['photo'].setValue(
          //   this.data[0].personal_info.photo
          // );
          for (let i = 0; i <= this.data[0].address.length; i++) {
            if (this.data[0].address[i].type == 'current') {
              this.personalInformation.patchValue({
                current: {
                  house_no: this.data[0].address[i].house_no,
                  street: this.data[0].address[i].street,
                  locality: this.data[0].address[i].locality,
                  city: this.data[0].address[i].city,
                  state: this.data[0].address[i].state,
                  country: this.data[0].address[i].country,
                  pincode: this.data[0].address[i].pincode,
                },
              });
            } else {
              this.personalInformation.patchValue({
                permanent: {
                  house_no: this.data[0].address[i].house_no,
                  street: this.data[0].address[i].street,
                  locality: this.data[0].address[i].locality,
                  city: this.data[0].address[i].city,
                  state: this.data[0].address[i].state,
                  country: this.data[0].address[i].country,
                  pincode: this.data[0].address[i].pincode,
                },
              });
            }
          }
        }
      });
  }

  // numberValidation(control: FormControl):ValidatorFn {
  //   let no = control.value;
  //   let regex = new RegExp('^[6-9]{1}[0-9]{9}$');
  //   if (no.length > 10 || regex.test(no)) {
  //     return { numberValidation: true };
  //   } else {
  //     return null;
  //   }
  // }

  getErrorMessage() {
    // console.log('entering');
    if (
      this.personalInformation.get('email')?.getError('required') ||
      this.personalInformation.get('first_name')?.getError('required')
    ) {
      return 'You must enter a value';
    }
    if (this.personalInformation.get('mobile_number')?.getError('pattern')) {
      return 'Enter a valid mobile number';
    }
    return '';
  }
}
