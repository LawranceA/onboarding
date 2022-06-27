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

export interface EditEmployee {
  id: string;
  name: string;
  email: string;
  phoneno: string;
  doj: string;
  designation: string;
}
const data: EditEmployee[] = [
  {
    id: 'DB001',
    name: 'xyz',
    email: 'xyz@gmail.com',
    phoneno: '9845639021',
    doj: '2020-02-02',
    designation: 'Front End',
  },
];
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
  faArrowRight=faArrowRight

  //src
  src = '';
  backData: any;
  //to display files section for education
  clicked = '';
  // 
  education:any

  dateValidator = true;
  index: number = -1;
  // genders = ['Male', 'Female', 'Others'];
  // today = new Date();
  percentErrSt = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dummy:AdminServiceService,
    private service: AdminService,
    private userService:UserDataService,
    private edService:Dialog10serviceService,
    private tokenStorage:TokenStorageService
  ) {}

  id: any;
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.service.getOneEmployees(this.id).subscribe((data) => {
        this.backData = data;
        this.src=`http://onboarding-backend.southindia.cloudapp.azure.com:1337/uploads/${data[0].id}/${data[0].photo}`
        console.log(this.backData);
        this.backData[0].educational_info.sort((a:any,b:any) => (a.type > b.type) ? -1 : ((b.type > a.type) ? 1 : 0))
      });
      // this.backData=this.dummy.getData()
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
  // submit() {
  //   // this.service.setData(this.data);
  //   // console.log(data);
  // }
  // fileChange(filed: any, e: any, index?: any, type?: any) {
  //   // console.log(JSON.parse(ob))
  //   console.log(this.data[0].educational[index].type);
  //   if (filed == 'marksheet') {
  //     this.data[0].educational[index].marksheet = e.target.files[0].name;
  //   } else if (filed == 'transfer_certificate') {
  //     this.data[0].educational[index].transfer_certificate =
  //       e.target.files[0].name;
  //   } else if (filed == 'provisonal_marks_card') {
  //     this.data[0].educational[index].provisonal_marks_card =
  //       e.target.files[0].name;
  //   } else if (filed == 'aadhar') {
  //     this.data[0].other_details.aadhar = e.target.files[0].name;
  //   } else if (filed == 'pan') {
  //     this.data[0].other_details.pan = e.target.files[0].name;
  //   } else if (filed == 'passport') {
  //     this.data[0].other_details.passport = e.target.files[0].name;
  //   } else if (filed == 'covid_certificate') {
  //     this.data[0].other_details.covid_certificate = e.target.files[0].name;
  //   }
  // }
  // deleteFile(field: any, i?: any, type?: any) {
  //   if (field == 'marksheet') {
  //     this.data[0].educational[i].marksheet = null;
  //   } else if (field == 'transfer_certificate') {
  //     this.data[0].educational[i].transfer_certificate = null;
  //   } else if (field == 'provisonal_marks_card') {
  //     this.data[0].educational[i].provisonal_marks_card = null;
  //   } else if (field == 'aadhar') {
  //     this.data[0].other_details.aadhar = null;
  //   } else if (field == 'pan') {
  //     this.data[0].other_details.pan = null;
  //   } else if (field == 'passport') {
  //     this.data[0].other_details.passport = null;
  //   } else if (field == 'covid_certificate') {
  //     this.data[0].other_details.covid_certificate = null;
  //   }
  // }
  personalDataSubmit() {
    
      this.backData[0].personal_info.updated_at=new Date()
      this.backData[0].personal_info.updated_by=this.tokenStorage.getName()
      this.userService.putPersonalInfo(this.backData[0].personal_info).subscribe(data=>{
        console.log(data)
      })
      for(let i=0;i<this.backData[0].address.length;i++){
        this.backData[0].address[i].updated_at=new Date()
        this.backData[0].address[i].updated_by=this.tokenStorage.getName()
        this.userService.putAddress(this.backData[0].address[i]).subscribe(data=>{
          console.log(data)
        })

      }
    
  }
  edDetailsSubmit(id:any){
    this.edService.putEduaction(this.backData[0].educational_info[id],id).subscribe(data=>{
      console.log(data)
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
  fileChange(field: any,e: any, index?: any,type?:any) {
    console.log(e.target.files);
    const file = e.target.files[0];

    if (e.target.files[0].size > 1000000) {
      alert('File size should be less than 1MB');
      return;
    }
    switch(field){
      case 'pic':
        let form = new FormData();
        form.append('photo', file);
        form.append('id', this.backData[0].id);
        form.append('updated_at',`${new Date()}`)
        form.append('updated_by',this.tokenStorage.getName())
        console.log(this.backData.id)
        // add photo
        this.userService.addPhoto(form).subscribe((data) => {
          console.log(data)
          location.reload();
        });
        break;
      case 'marksheet':
        this.backData[0].educational_info[index].marks_card=file
        break;
      case 'convocation_certificate':
        this.backData[0].educational_info[index].convocation_certificate=file
        break;
      case 'provisonal_marks_card':
        this.backData[0].educational_info[index].provisonal_marks_card=file
    }
    
  }
}
