import { Component, OnInit } from '@angular/core';
import { DialogOrgComponent } from '../dialog-org/dialog-org.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogConfig,
} from '@angular/material/dialog';
import { Router } from '@angular/router';

import { SharedService } from '../../services/shared.service';


@Component({
  selector: 'app-employment-details',
  templateUrl: './employment-details.component.html',
  styleUrls: ['./employment-details.component.css'],
})
export class EmploymentDetailsComponent implements OnInit {
 
   

  formData : any[] = [{firstname : "subrath", age : 26}]
  constructor(private dialog: MatDialog, private router: Router,private share : SharedService) {}

  next() {
    this.router.navigateByUrl('/user/details/other-details');
  }
  back() {
    this.router.navigateByUrl('/user/details/educational-qualification');
  }


  ngOnInit(): void {
   this.formData = this.share.getFormData()
   console.log(this.formData)
  }

  openDialog() {
    const dialogStyle = {
      height: '90%',
      width: '30%',
      disableClose : true,
    };

 this.dialog.open(DialogOrgComponent, dialogStyle);
  }





  
 

}
