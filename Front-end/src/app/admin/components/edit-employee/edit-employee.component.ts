import { Component, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AdminServiceService } from '../../admin-service.service';

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
  data: any;
  //to display files section for education
  clicked = '';

  dateValidator = true
  index:number = -1
  genders = ['Male', 'Female', 'Others'];
  today=new Date();
  percentErrSt=false
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: AdminServiceService
  ) {}


 

    id:any
  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap)=>{
     this.id=params.get('id') 
    })

    this.data = this.service.getData();
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
  submit() {
    this.service.setData(this.data);
    console.log(data);
  }
  fileChange(filed: any, e: any, index?: any, type?: any) {
    // console.log(JSON.parse(ob))
    console.log(this.data[0].educational[index].type);
    if (filed == 'marksheet') {
      this.data[0].educational[index].marksheet = e.target.files[0].name;
    } else if (filed == 'transfer_certificate') {
      this.data[0].educational[index].transfer_certificate =
        e.target.files[0].name;
    } else if (filed == 'provisonal_marks_card') {
      this.data[0].educational[index].provisonal_marks_card =
        e.target.files[0].name;
    } else if (filed == 'aadhar') {
      this.data[0].other_details.aadhar = e.target.files[0].name;
    } else if (filed == 'pan') {
      this.data[0].other_details.pan = e.target.files[0].name;
    } else if (filed == 'passport') {
      this.data[0].other_details.passport = e.target.files[0].name;
    }else if (filed == 'covid_certificate') {
      this.data[0].other_details.covid_certificate = e.target.files[0].name;
    }
  }
  deleteFile(field: any, i?: any, type?: any) {
    if (field == 'marksheet') {
      this.data[0].educational[i].marksheet = null;
    } else if (field == 'transfer_certificate') {
      this.data[0].educational[i].transfer_certificate = null;
    } else if (field == 'provisonal_marks_card') {
      this.data[0].educational[i].provisonal_marks_card = null;
    } else if (field == 'aadhar') {
      this.data[0].other_details.aadhar = null;
    } else if (field == 'pan') {
      this.data[0].other_details.pan = null;
    } else if (field == 'passport') {
      this.data[0].other_details.passport = null;
    } else if (field == 'covid_certificate') {
      this.data[0].other_details.covid_certificate = null;
    }
  }
  onSubmit() {
    
  }
  dateValidators(i:any){ 

    console.log("s") 
  
    let start= this.data[0].educational[i].start_date 
  
    let end= this.data[0].educational[i].end_date 
    if(typeof(this.data[0].educational[i].start_date)!='string' || typeof(this.data[0].educational[i].start_date)!='string')
    {
      console.log(typeof(start));
      if(Date.parse(`${start._i.year}-${start._i.month+1}-${start._i.date}`)>=Date.parse(`${end._i.year}-${end._i.month+1}-${end._i.date}`)){ 
    
        console.log(Date.parse(`${start._i.year}-${start._i.month+1}-${start._i.date}`)>=Date.parse(`${end._i.year}-${end._i.month+1}-${end._i.date}`)) 
    
          this.dateValidator=false 
          this.index=i;
    
          console.log(this.dateValidator) 
    
      }else{ 
    
        this.dateValidator=true 
    
      } 
    }else{
      if(Date.parse(start)>Date.parse(end))
      {
        this.dateValidator=false 
        this.index=i;
        console.log(this.dateValidator) 
  
    }else{ 
  
      this.dateValidator=true 
  
    } 
      }
    }
    percentageValidator(e:Event,i:any){
      let percentage = (<HTMLInputElement>e.target).value;
     
      if(!/(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/.test(percentage)|| Number(percentage) == 0 || Number(percentage) > 100 || (Number(percentage)>10 && Number(percentage)<=45)){
       this.percentErrSt=true
       this.index=i
      }else{
        this.percentErrSt=false
       
      };
    }
  
  } 
  





