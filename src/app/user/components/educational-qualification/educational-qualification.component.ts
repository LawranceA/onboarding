import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../dialog10/dialog.component';
import { Dialog12Component } from '../dialog12/dialog12.component';
import { DialogUGComponent } from '../dialog-ug/dialog-ug.component';
import { DialogPGComponent } from '../dialog-pg/dialog-pg.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-educational-qualification',
  templateUrl: './educational-qualification.component.html',
  styleUrls: ['./educational-qualification.component.css'],
})
export class EducationalQualificationComponent implements OnInit {
  educations = ['10th', '12th', 'Graduation/Diploma', 'Masters/Post-Graduation'];

  constructor(private dialog: MatDialog, private router: Router) {}
  
  next(){
    this.router.navigateByUrl('/user/details/employment-details');
  }

  back(){
    this.router.navigateByUrl('/user/details/personal-information');
  }
  ngOnInit(): void {}

  openDialog(index: number) {
    const dialogStyle = {
      height: '90%',
      width: '40%',
      
    };
    switch (index) {
      case 0:
        this.dialog.open(DialogComponent, dialogStyle);
        break;
      case 1:
        this.dialog.open(Dialog12Component, dialogStyle);
        break;
      case 2:
        this.dialog.open(DialogUGComponent, dialogStyle);
        break;
      case 3:
        this.dialog.open(DialogPGComponent, dialogStyle);
        break;
    }
  }

 
}
