import { Component, OnInit } from '@angular/core';
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
    // this.display = 'block';
    this.clicked = val;
    // this.files=data
  }
  close() {
    this.display = 'none';
  }
  submit() {
    this.service.setData(this.data);
    console.log(this.data);
  }
  fileChange(index: any, type: any, filed: any, e: any) {
    // console.log(JSON.parse(ob))
    console.log(this.data[0].educational[index].type);
    if (filed == 'marksheet') {
      this.data[0].educational[index].marksheet = e.target.files[0].name;
    }
    // this.data.ob[index].type.filed=e.target.files
  }
  deleteFile(i:any,type:any,field:any){
    if(field=="marksheet"){
      this.data[0].educational[i].marksheet = null;
    }
  }
  onSubmit() {}
}