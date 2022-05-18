import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Dialog10serviceService } from '../../services/dialog10service.service';

@Component({
  selector: 'app-dialog12',
  templateUrl: './dialog12.component.html',
  styleUrls: ['./dialog12.component.css'],
})
export class Dialog12Component implements OnInit {
  dialog12Form!: FormGroup;
  actionBtn: String = 'Save';

  constructor(
    private fs: FormBuilder,
    private tokenStorage: TokenStorageService,
    private dialogRef: MatDialogRef<Dialog12Component>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private api: Dialog10serviceService
  ) {}

  ngOnInit(): void {
    this.dialog12Form = this.fs.group({
      education: ['12th', Validators.required],
      board: ['', Validators.required],
      School: ['', Validators.required],
      percentage: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      marksheet: ['', Validators.required],
      transferCertificate: [''],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.dialog12Form.controls['education'].setValue(this.editData.type);
      this.dialog12Form.controls['board'].setValue(this.editData.board);
      this.dialog12Form.controls['School'].setValue(this.editData.name);
      this.dialog12Form.controls['percentage'].setValue(this.editData.marks);
      this.dialog12Form.controls['startDate'].setValue(
        this.editData.start_date
      );
      this.dialog12Form.controls['endDate'].setValue(this.editData.end_date);
      this.dialog12Form.controls['marksheet'].setValue(
        this.editData.marks_card
      );
      this.dialog12Form.controls['transferCertificate'].setValue(
        this.editData.transfer_certificate
      );
    }
  }

  // Adding the 10 education data
  add12Form() {
    console.log(this.dialog12Form.value);
    this.dialog12Form.value.created_at = new Date();
    this.dialog12Form.value.updated_at = new Date();
    this.dialog12Form.value.updated_by = this.tokenStorage.getName();
    this.dialog12Form.value.fk_education_users_id = this.tokenStorage.getID();
    if (!this.editData) {
      if (this.dialog12Form.valid) {
        this.api.postEducation(this.dialog12Form.value).subscribe({
          next: (res) => {
            alert('Form Data successfully added');
            this.dialog12Form.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('Error in adding the form data');
          },
        });
      }
    } else {
      this.updateData();
    }
  }

  updateData() {
    this.dialog12Form.value.created_at = this.editData.created_at;
    this.api.putEduaction(this.dialog12Form.value, this.editData.id).subscribe({
      next: (res) => {
        alert('Details updated successfully');
        this.dialog12Form.reset();
        this.dialogRef.close('updated');
      },
      error: () => {
        alert('Details cannot be modified');
      },
    });
  }
}

// add12Form(){
//   console.log(this.dialog12Form.value)
// }
