import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogData } from '../employee-details/employee-details.component';

@Component({
  selector: 'app-files-uploaded',
  templateUrl: './files-uploaded.component.html',
  styleUrls: ['./files-uploaded.component.css']
})
export class FilesUploadedComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FilesUploadedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private rote:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  check(data:any){
    if(data.fileType=='img'){
      let scr=data.src
      this.router.navigate(["/admin/viewImg",scr])
    }else{
      let scr=data.src
      this.router.navigate(["/admin/viewPdf",scr])
    }
  }
}
