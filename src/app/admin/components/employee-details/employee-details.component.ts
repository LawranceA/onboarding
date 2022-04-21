import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { FilesUploadedComponent } from '../files-uploaded/files-uploaded.component';
export interface DialogData {
  file:any,
  images:any
}
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
 
  img = '../../../../assets/images/account_registered.svg';
  display = '';
  personalInfo={
    fname:'mike louies',
    lname:'xyz',
    dob:'1998-02-01',
    mobNo:'78090909',
    alternateNo:'7687687687',
    personalEmail:'mikefhfhgfhgfhgf@gmaul.com'
  }
    address={
      currentAdd:'#123 nandhi nagar bangaladesh'
    }

    emp=[{name:'ytrytryt',join:'6576576',notice:'76876'},{name:'iuou',join:'',notice:''},{name:'ytrytryt',join:'6576576',notice:'76876'}]
    files=[{name:'Profile',src:'../../../../assets/images/account_registered.svg',fileType:'img'},{name:'Marks',src:'../assets/docs/sample.pdf',fileType:'pdf'}]
    images:any
    constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(FilesUploadedComponent, {
     
      data:{file:this.files}
    });
  }
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
  openImg() {
    this.display = 'block';
  }
  closeImg() {
    this.display = 'none';
  }
}
