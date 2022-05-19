import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Dialog10serviceService } from '../../services/dialog10service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  dialog10Form!: FormGroup;
  actionBtn: String = 'Save';

  constructor(
    private fs: FormBuilder,
    private api: Dialog10serviceService,
    private tokenStorage: TokenStorageService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    this.dialog10Form = this.fs.group({
      education: ['10th', Validators.required],
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
      this.dialog10Form.controls['education'].setValue(this.editData.type);
      this.dialog10Form.controls['board'].setValue(this.editData.board);
      this.dialog10Form.controls['School'].setValue(this.editData.name);
      this.dialog10Form.controls['percentage'].setValue(
        this.editData.marks
      );
      this.dialog10Form.controls['startDate'].setValue(this.editData.start_date);
      this.dialog10Form.controls['endDate'].setValue(this.editData.end_date);
      this.dialog10Form.controls['marksheet'].setValue(this.editData.marks_card);
      this.dialog10Form.controls['transferCertificate'].setValue(
        this.editData.transfer_certificate
      );
    }
  }

  // Adding the 10 education data
  add10Form() {
    console.log(this.dialog10Form.value)
    this.dialog10Form.value.created_at = new Date();
    this.dialog10Form.value.updated_at = new Date();
    this.dialog10Form.value.updated_by = this.tokenStorage.getName();
    this.dialog10Form.value.fk_education_users_id = this.tokenStorage.getID();
    if (!this.editData) {
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
    } else {
      this.updateData();
    }
  }

  updateData() {
    this.dialog10Form.value.created_at = this.editData.created_at;
    this.api.putEduaction(this.dialog10Form.value, this.editData.id).subscribe({
      next: (res) => {
        alert('Details updated successfully');
        this.dialog10Form.reset();
        this.dialogRef.close('updated');
      },
      error: () => {
        alert('Details cannot be modified');
      },
    });
  }
  getErrorMessage() {
    // console.log('entering');
    if (
      this.dialog10Form.get('board')?.getError('required') ||
      this.dialog10Form.get('School')?.getError('required') ||
      this.dialog10Form.get('Percentage')?.getError('required')||
      this.dialog10Form.get('startDate')?.getError('required') ||
      this.dialog10Form.get('endDate')?.getError('required')
    ) {
      return 'You must enter a value';
    }
    if (
      this.dialog10Form.get('marksheet')?.getError('required') ) {
      return 'Please select a file';
    }
    
    return '';
  }
}
