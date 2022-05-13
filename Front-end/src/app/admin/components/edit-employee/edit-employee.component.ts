import { Component, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminServiceService } from '../../admin-service.service';

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
})
export class EditEmployeeComponent implements OnInit {
  data: any;
  //to display files section for education
  clicked = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: AdminServiceService
  ) {}

  ngOnInit(): void {
    this.data = this.service.getData();
  }

  display = 'none';
  files = [];
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
  //files

  //open and close dialog box
  openDiag(val: any, data: any) {
    this.clicked = val;
  }
  close() {
    this.display = 'none';
  }
  submit() {
    this.service.setData(this.data);
    console.log(this.data);
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
  onSubmit() {}
}
