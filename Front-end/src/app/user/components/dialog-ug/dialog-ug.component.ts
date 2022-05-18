import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Dialog10serviceService } from '../../services/dialog10service.service';
import { Dialog12Component } from '../dialog12/dialog12.component';

@Component({
  selector: 'app-dialog-ug',
  templateUrl: './dialog-ug.component.html',
  styleUrls: ['./dialog-ug.component.css'],
})
export class DialogUGComponent implements OnInit {
  dialogUGForm!: FormGroup;
  actionBtn: String = 'Save';

  constructor(
    private fs: FormBuilder,
    private tokenStorage: TokenStorageService,
    private dialogRef: MatDialogRef<DialogUGComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private api: Dialog10serviceService
  ) {}

  ngOnInit(): void {
    this.dialogUGForm = new FormGroup({
      education: new FormControl('Graduation/Diploma'),
      School: new FormControl('', [Validators.required]),
      course: new FormControl('', [Validators.required]),
      specialization: new FormControl('', [Validators.required]),
      board: new FormControl('', [Validators.required]),
      percentage: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      marksheet: new FormControl('', [Validators.required]),
      transferCertificate: new FormControl(''),
      provisionalCertificate: new FormControl(''),
      convocationCertificate: new FormControl(''),
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.dialogUGForm.controls['education'].setValue(this.editData.type);
      this.dialogUGForm.controls['board'].setValue(this.editData.board);
      this.dialogUGForm.controls['School'].setValue(this.editData.name);
      this.dialogUGForm.controls['percentage'].setValue(this.editData.marks);
      this.dialogUGForm.controls['course'].setValue(this.editData.course);
      this.dialogUGForm.controls['specialization'].setValue(
        this.editData.specialization
      );
      this.dialogUGForm.controls['startDate'].setValue(
        this.editData.start_date
      );
      this.dialogUGForm.controls['endDate'].setValue(this.editData.end_date);
      this.dialogUGForm.controls['marksheet'].setValue(
        this.editData.marks_card
      );
      this.dialogUGForm.controls['transferCertificate'].setValue(
        this.editData.transfer_certificate
      );
      this.dialogUGForm.controls['provisionalCertificate'].setValue(
        this.editData.provisional_marks_card
      );
      this.dialogUGForm.controls['convocationCertificate'].setValue(
        this.editData.convocation_certificate
      );
    }
  }

  // Adding the UG education data
  addUGForm() {
    console.log(this.dialogUGForm.value);
    this.dialogUGForm.value.created_at = new Date();
    this.dialogUGForm.value.updated_at = new Date();
    this.dialogUGForm.value.updated_by = this.tokenStorage.getName();
    this.dialogUGForm.value.fk_education_users_id = this.tokenStorage.getID();
    if (!this.editData) {
      if (this.dialogUGForm.valid) {
        this.api.postEducation(this.dialogUGForm.value).subscribe({
          next: (res) => {
            alert('Form Data successfully added');
            this.dialogUGForm.reset();
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
    this.dialogUGForm.value.created_at = this.editData.created_at;
    this.api.putEduaction(this.dialogUGForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('Details updated successfully');
        this.dialogUGForm.reset();
        this.dialogRef.close('updated');
      },
      error: () => {
        alert('Details cannot be modified');
      },
    });
  }
}
