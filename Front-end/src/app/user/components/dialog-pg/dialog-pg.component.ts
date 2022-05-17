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
import { DialogUGComponent } from '../dialog-ug/dialog-ug.component';

@Component({
  selector: 'app-dialog-pg',
  templateUrl: './dialog-pg.component.html',
  styleUrls: ['./dialog-pg.component.css'],
})
export class DialogPGComponent implements OnInit {
  dialogPGForm!: FormGroup;
  actionBtn: String = 'Save';

  constructor(
    private fs: FormBuilder,
    private tokenStorage: TokenStorageService,
    private dialogRef: MatDialogRef<DialogPGComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private api: Dialog10serviceService
  ) {}

  ngOnInit(): void {
    this.dialogPGForm = new FormGroup({
      education: new FormControl('Masters/Post-Graduation'),
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
      this.dialogPGForm.controls['education'].setValue(this.editData.type);
      this.dialogPGForm.controls['board'].setValue(this.editData.board);
      this.dialogPGForm.controls['School'].setValue(this.editData.name);
      this.dialogPGForm.controls['percentage'].setValue(this.editData.marks);
      this.dialogPGForm.controls['course'].setValue(this.editData.course);
      this.dialogPGForm.controls['specialization'].setValue(this.editData.specialization);
      this.dialogPGForm.controls['startDate'].setValue(
        this.editData.start_date
      );
      this.dialogPGForm.controls['endDate'].setValue(this.editData.end_date);
      this.dialogPGForm.controls['marksheet'].setValue(
        this.editData.marks_card
      );
      this.dialogPGForm.controls['transferCertificate'].setValue(
        this.editData.transfer_certificate
      );
      this.dialogPGForm.controls['provisionalCertificate'].setValue(
        this.editData.provisional_certificate
      );
      this.dialogPGForm.controls['convocationCertificate'].setValue(
        this.editData.convocation_certificate
      );
    }
  }

  // Adding the UG education data
  addPGForm() {
    console.log(this.dialogPGForm.value);
    this.dialogPGForm.value.created_at = new Date();
    this.dialogPGForm.value.updated_at = new Date();
    this.dialogPGForm.value.updated_by = this.tokenStorage.getName();
    this.dialogPGForm.value.fk_education_users_id = this.tokenStorage.getID();
    if (!this.editData) {
      if (this.dialogPGForm.valid) {
        this.api.postEducation(this.dialogPGForm.value).subscribe({
          next: (res) => {
            alert('Form Data successfully added');
            this.dialogPGForm.reset();
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
    this.api.putEduaction(this.dialogPGForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('Details updated successfully');
        this.dialogPGForm.reset();
        this.dialogRef.close('updated');
      },
      error: () => {
        alert('Details cannot be modified');
      },
    });
  }
}
