import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Dialog10serviceService } from '../../services/dialog10service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  dialog10Form!: FormGroup;
  actionBtn : String = "Save"

  constructor(
    private fs: FormBuilder,
    private api: Dialog10serviceService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    this.dialog10Form = this.fs.group({
      education: ['10th', Validators.required],
      board: ['', Validators.required],
      schoolMedium: ['', Validators.required],
      percentage: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      marksheet: ['', Validators.required],
      transferCertificate: [''],
    });

    if(this.editData){
      this.actionBtn = "Update"
      this.dialog10Form.controls['education'].setValue(this.editData.education)
      this.dialog10Form.controls['board'].setValue(this.editData.board)
      this.dialog10Form.controls['schoolMedium'].setValue(this.editData.schoolMedium)
      this.dialog10Form.controls['percentage'].setValue(this.editData.percentage)
      this.dialog10Form.controls['startDate'].setValue(this.editData.startDate)
      this.dialog10Form.controls['endDate'].setValue(this.editData.endDate)
      this.dialog10Form.controls['marksheet'].setValue(this.editData.marksheet)
      this.dialog10Form.controls['transferCertificate'].setValue(this.editData.transferCertificate)
    }
  }

  // Adding the 10 education data
  add10Form() {
    // console.log(this.dialog10Form.value)
   if(!this.editData){
    if (this.dialog10Form.valid) {
      this.api.postEducation(this.dialog10Form.value).subscribe({
        next: (res) => {
          alert('Form Data successfully added');
          this.dialog10Form.reset();
          this.dialogRef.close('save');
        },
        error: () => {
          alert('Error in adding the form data');
        },
      });
    }
   }else{
     this.updateData()
   }
  }

  updateData(){
    this.api.putEduaction(this.dialog10Form.value, this.editData.id).subscribe({
      next:(res)=>{
        alert("Details updated successfully");
        this.dialog10Form.reset();
        this.dialogRef.close('updated')
      },
      error:()=>{
        alert("Details cannot be modified")
      }
    })
  }
}
