import { Component, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AdminServiceService } from '../../admin-service.service';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faUserPen } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
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
import { AdminService } from '../../services/admin.service';
import { UserDataService } from 'src/app/user/services/user-data.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { SharedService } from 'src/app/user/services/shared.service';
import { Dialog10serviceService } from 'src/app/user/services/dialog10service.service';
import { DatePipe } from '@angular/common';

// export interface EditEmployee {
//   id: string;
//   name: string;
//   email: string;
//   phoneno: string;
//   doj: string;
//   designation: string;
// }
// const data: EditEmployee[] = [
//   {
//     id: 'DB001',
//     name: 'xyz',
//     email: 'xyz@gmail.com',
//     phoneno: '9845639021',
//     doj: '2020-02-02',
//     designation: 'Front End',
//   },
// ];
@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
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
export class EditEmployeeComponent implements OnInit {
  //icons
  faCircleArrowLeft = faCircleArrowLeft;
  faUser = faUserPen;
  faCircleCheck = faCircleCheck;
  faArrowRight = faArrowRight;

  //src
  src = '';
  backData: any;
  //to display files section for education
  clicked = '';
  //
  education: any;

  dateValidator = true;
  index: number = -1;
  // genders = ['Male', 'Female', 'Others'];
  today = new Date();
  percentErrSt = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: AdminService,
    private userService: UserDataService,
    private edService: Dialog10serviceService,
    private emService: SharedService,
    private tokenStorage: TokenStorageService,
    private pipe: DatePipe
  ) {}

  id: any;
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.service.getOneEmployees(this.id).subscribe((data) => {
        this.backData = data;
        if(data.photo!=null){
          this.src = `http://onboarding-backend.southindia.cloudapp.azure.com:1337/uploads/${data[0].id}/${data[0].photo}`;
        }
        console.log(this.backData);
        this.backData[0].educational_info.sort((a: any, b: any) =>
          a.type > b.type ? -1 : b.type > a.type ? 1 : 0
        );
        this.backData[0].educational_info.sort((a: any, b: any) =>
          a.type > b.type ? -1 : b.type > a.type ? 1 : 0
        );
      });
    });
  }

  display = 'none';

  // for expansion pannel
  step = 0;
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }
  //open and close dialog box
  openDiag(val: any) {
    this.clicked = val;
  }
  close() {
    this.display = 'none';
  }

  personalDataSubmit() {
    this.backData[0].personal_info.updated_at = new Date();
    this.backData[0].personal_info.updated_by = this.tokenStorage.getName();
    this.userService
      .putPersonalInfo(this.backData[0].personal_info)
      .subscribe((data) => {
        if (data.message == 'updated') {
          alert('Data updated Sucsuccessfully');
        } else {
          alert('Error in adding the form data');
        }
      });
    for (let i = 0; i < this.backData[0].address.length; i++) {
      this.backData[0].address[i].updated_at = new Date();
      this.backData[0].address[i].updated_by = this.tokenStorage.getName();
      this.userService
        .putAddress(this.backData[0].address[i])
        .subscribe((data) => {
          console.log(data);
        });
    }
  }
  edDetailsSubmit(i: any) {
    let form = new FormData();
    form.append('type', this.backData[0].educational_info[i].type);
    form.append('board', this.backData[0].educational_info[i].board);
    form.append('name', this.backData[0].educational_info[i].name);
    form.append('marks', this.backData[0].educational_info[i].marks);
    console.log(this.backData[0].educational_info[i].marks_card);
    form.append('marks_card', this.backData[0].educational_info[i].marks_card);
    form.append('course', this.backData[0].educational_info[i].course);
    form.append(
      'specialization',
      this.backData[0].educational_info[i].specialization
    );
    form.append(
      'provisional_marks_card',
      this.backData[0].educational_info[i].provisional_marks_card
    );
    form.append(
      'convocation_certificate',
      this.backData[0].educational_info[i].convocation_certificate
    );
    form.append('start_date', this.backData[0].educational_info[i].start_date);
    form.append('end_date', this.backData[0].educational_info[i].end_date);
    form.append('updated_at', `${new Date()}`);
    form.append('updated_by', this.tokenStorage.getName());
    form.append(
      'fk_education_users_id',
      this.backData[0].educational_info[i].fk_education_users_id
    );

    this.edService
      .putEduaction(form, this.backData[0].educational_info[i].id)
      .subscribe((data) => {
        if (data.message == 'updated') {
          alert('Data updated Sucsuccessfully');
        } else {
          alert('Error in adding the form data');
        }
      });
    }
    emDetailsSubmit(i: any) {
      let form = new FormData();
      console.log(this.backData[0].employment_details[i])
      console.log(this.backData[0].employment_details[i].joining_date)
    form.append('org_name',this.backData[0].employment_details[i].org_name);
    form.append('type',this.backData[0].employment_details[i].type);
    form.append('hr_name',this.backData[0].employment_details[i].hr_name);
    if(typeof(this.backData[0].employment_details[i].joining_date)!='string'){
      let jDate = `${this.backData[0].employment_details[i].joining_date._i.year}-${
        this.backData[0].employment_details[i].joining_date._i.month + 1
      }-${this.backData[0].employment_details[i].joining_date._i.date}`;
      form.append(
        'joining_date',
        `${this.pipe.transform(jDate, 'YYYY-MM-dd')}`
      );
    }else{
      form.append(
        'joining_date',
        this.backData[0].employment_details[i].joining_date
      );
    }
    if(typeof(this.backData[0].employment_details[i].relieving_date)!='string'){
      let jDate = `${this.backData[0].employment_details[i].relieving_date._i.year}-${
        this.backData[0].employment_details[i].relieving_date._i.month + 1
      }-${this.backData[0].employment_details[i].relieving_date._i.date}`;
      form.append(
        'relieving_date',
        `${this.pipe.transform(jDate, 'YYYY-MM-dd')}`
      );
    }else{
      form.append(
        'relieving_date',
        this.backData[0].employment_details[i].relieving_date
      );

    }
    if(typeof(this.backData[0].employment_details[i].notice_date)!='string'){
      let jDate = `${this.backData[0].employment_details[i].notice_date._i.year}-${
        this.backData[0].employment_details[i].notice_date._i.month + 1
      }-${this.backData[0].employment_details[i].notice_date._i.date}`;
      form.append(
        'notice_date',
        `${this.pipe.transform(jDate, 'YYYY-MM-dd')}`
      );
    }else{

      form.append(
        'notice_date',
        this.backData[0].employment_details[i].notice_date
      );
    }
    form.append(
      'relieving_letter',
      this.backData[0].employment_details[i].relieving_letter
    );
    form.append(
      'offer_letter',
      this.backData[0].employment_details[i].offer_letter
    );
    form.append('pay_slip1', this.backData[0].employment_details[i].pay_slip1);
    form.append('pay_slip2', this.backData[0].employment_details[i].pay_slip2);
    form.append('pay_slip3', this.backData[0].employment_details[i].pay_slip3);
    form.append('updated_at', `${new Date()}`);
    form.append('updated_by', this.tokenStorage.getName());
    form.append(
      'fk_employment_users_id',
      this.backData[0].employment_details[i].fk_employment_users_id
    );
    this.emService
      .putOrganization(form,this.backData[0].employment_details[i].id)
      .subscribe((data) => {
        if (data.message == 'updated') {
          alert('Data updated Sucsuccessfully');
        } else {
          alert('Error in adding the form data');
        }
      });
  }
  prDetailsSubmit() {
    let form=new FormData()
    
    form.append(
      'aadhar_card_number',
      this.backData[0].other_details.aadhar_card_number
    );
    form.append('aadhar', this.backData[0].other_details.aadhar);
    form.append(
      'pan_card_number',
      this.backData[0].other_details.pan_card_number
    );
    form.append('pan_card', this.backData[0].other_details.pan_card);
    form.append(
      'passport_number',
      this.backData[0].other_details.passport_number
    );
if(typeof(this.backData[0].other_details.passport_expire_date)!='string'){
  let passport_expire = `${this.backData[0].other_details.passport_expire_date._i.year}-${
    this.backData[0].other_details.passport_expire_date._i.month + 1
  }-${this.backData[0].other_details.passport_expire_date._i.date}`;
  form.append(
    'passport_expire_date',
    `${this.pipe.transform(passport_expire, 'YYYY-MM-dd')}`
  );
}
    form.append('passport', this.backData[0].other_details.passport);
    form.append(
      'covid_certificate',
      this.backData[0].other_details.covid_certificate
    );
    this.service
      .putProofdetails(
        form,
        this.backData[0].other_details.fk_proof_users_id
      )
      .subscribe((data) => {
        if (data.message == 'updated') {
          alert('Data updated Sucsuccessfully');
        } else {
          alert('Error in adding the form data');
        }
      });
  }
  bkDetailsSubmit() {
    this.backData[0].bank_detail.updated_at = new Date();
    this.backData[0].bank_detail.updated_by = this.tokenStorage.getName();
    this.service
      .putBankDetails(
        this.backData[0].bank_detail,
        this.backData[0].bank_detail.fk_bank_users_id
      )
      .subscribe((data) => {
        if (data.message == 'updated') {
          alert('Data updated Sucsuccessfully');
        } else {
          alert('Error in adding the form data');
        }
      });
  }
  decDetailsSubmit() {
    if(typeof(this.backData[0].other_declaration.joining_date)!='string'){
      let joining_date = `${
        this.backData[0].other_declaration.joining_date._i.year
      }-${this.backData[0].other_declaration.joining_date._i.month + 1}-${
        this.backData[0].other_declaration.joining_date._i.date 
      }`;
      this.backData[0].other_declaration.joining_date=`${this.pipe.transform(joining_date, 'YYYY-MM-dd')}`
    }
    this.backData[0].other_declaration.updated_by=this.tokenStorage.getName()
    this.backData[0].other_declaration.updated_at=`${new Date()}`

    this.userService.putDeclaration( this.backData[0].other_declaration, this.backData[0].other_declaration.fk_declaration_users_id).subscribe(data=>{
      if(data.message=='updated'){
        alert('Data updated successfully')
      }else{
        alert('Error in updating the form data');
      }
    })
  }
  dateValidators(i: any) {
    console.log('s');

    let start = this.backData[0].educational[i].start_date;

    let end = this.backData[0].educational[i].end_date;
    if (
      typeof this.backData[0].educational[i].start_date != 'string' ||
      typeof this.backData[0].educational[i].start_date != 'string'
    ) {
      console.log(typeof start);
      if (
        Date.parse(`${start._i.year}-${start._i.month + 1}-${start._i.date}`) >=
        Date.parse(`${end._i.year}-${end._i.month + 1}-${end._i.date}`)
      ) {
        console.log(
          Date.parse(
            `${start._i.year}-${start._i.month + 1}-${start._i.date}`
          ) >= Date.parse(`${end._i.year}-${end._i.month + 1}-${end._i.date}`)
        );

        this.dateValidator = false;
        this.index = i;

        console.log(this.dateValidator);
      } else {
        this.dateValidator = true;
      }
    } else {
      if (Date.parse(start) > Date.parse(end)) {
        this.dateValidator = false;
        this.index = i;
        console.log(this.dateValidator);
      } else {
        this.dateValidator = true;
      }
    }
  }
  percentageValidator(e: Event, i: any) {
    let percentage = (<HTMLInputElement>e.target).value;

    if (
      !/(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/.test(
        percentage
      ) ||
      Number(percentage) == 0 ||
      Number(percentage) > 100 ||
      (Number(percentage) > 10 && Number(percentage) <= 45)
    ) {
      this.percentErrSt = true;
      this.index = i;
    } else {
      this.percentErrSt = false;
    }
  }
  fileChange(field: any, e: any, index?: any, type?: any) {
    console.log(e.target.files);
    const file = e.target.files[0];

    if (e.target.files[0].size > 1000000) {
      alert('File size should be less than 1MB');
      return;
    }
    switch (field) {
      case 'pic':
        let form = new FormData();
        form.append('photo', file);
        form.append('id', this.backData[0].id);
        form.append('updated_at', `${new Date()}`);
        form.append('updated_by', this.tokenStorage.getName());
        console.log(this.backData.id);
        // add photo
        this.userService.addPhoto(form).subscribe((data) => {
          console.log(data);
          location.reload();
        });
        break;
      case 'marksheet':
        this.backData[0].educational_info[index].marks_card = file;
        break;
      case 'pmc':
        console.log(
          this.backData[0].educational_info[index].provisional_marks_card
        );
        this.backData[0].educational_info[index].provisional_marks_card = file;
        break;
      case 'convocation_certificate':
        this.backData[0].educational_info[index].convocation_certificate = file;
        console.log(
          this.backData[0].educational_info[index].convocation_certificate
        );
        break;
      case 'relieving_letter':
        this.backData[0].employment_details[index].relieving_letter = file;
        break;
      case 'offer_letter':
        this.backData[0].employment_details[index].offer_letter = file;
        break;
      case 'pay_slip1':
        this.backData[0].employment_details[index].pay_slip1 = file;
        break;
      case 'pay_slip2':
        this.backData[0].employment_details[index].pay_slip2 = file;
        break;
      case 'pay_slip3':
        this.backData[0].employment_details[index].pay_slip3 = file;
        break;
      case 'aadhar':
        this.backData[0].other_details.aadhar = file;
        break;
      case 'pan':
        this.backData[0].other_details.pan_card = file;
        break;
      case 'passport':
        this.backData[0].other_details.passport = file;
        break;
    }
  }
}
