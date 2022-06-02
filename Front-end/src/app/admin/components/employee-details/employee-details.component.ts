import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AdminServiceService } from '../../admin-service.service';
import { FilesUploadedComponent } from '../files-uploaded/files-uploaded.component';
//dialouge box  data format
export interface DialogData {
  file:any,
}
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
 //img src for opening image in this page
  img = '../../../../assets/images/account_registered.svg';
  // for modal
  display = '';
  // dummy data to display in personal part
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
    //sending this to dialogue box
    files=[{name:'Profile',src:'../../../../assets/images/account_registered.svg',fileType:'img'},{name:'Marks',src:'../assets/docs/sample.pdf',fileType:'pdf'}]
  backData:any
    constructor(public dialog: MatDialog,private service:AdminServiceService) {}

  ngOnInit(): void { 
    this.service.getDetails("DB0003").subscribe(data=>{
this.backData=data
  this.files.push({name:JSON.stringify(data.photo),src:`http://localhost:3000/uploads/${data.id}/${data.photo}`,fileType:JSON.stringify(data.photo).substring(data.photo.indexOf('.') + 1)})
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FilesUploadedComponent, {
     data:{file:this.files}
    });
  }

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
  // for modal display
  openImg() {
    this.display = 'block';
  }
  closeImg() {
    this.display = 'none';
  }
}
