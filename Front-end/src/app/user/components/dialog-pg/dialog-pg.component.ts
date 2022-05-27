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

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';

import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

import 'moment/locale/ja';

import 'moment/locale/fr';
import { CustomValidationService } from '../../services/custom-validation.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dialog-pg',
  templateUrl: './dialog-pg.component.html',
  styleUrls: ['./dialog-pg.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class DialogPGComponent implements OnInit {
  dialogPGForm!: FormGroup;
  actionBtn: String = 'Save';

  dateValidator = true;

  constructor(
    private fs: FormBuilder,
    private tokenStorage: TokenStorageService,
    private dialogRef: MatDialogRef<DialogPGComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private api: Dialog10serviceService,
    public validation: CustomValidationService,
    private pipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.dialogPGForm = new FormGroup({
      education: new FormControl('Masters/Post-Graduation'),
      School: new FormControl('', [
        Validators.required,
        this.validation.characterValidator,
      ]),
      course: new FormControl('', [
        Validators.required,
        this.validation.characterValidator,
      ]),
      specialization: new FormControl('', [
        Validators.required,
        this.validation.characterValidator,
      ]),
      board: new FormControl('', [
        Validators.required,
        this.validation.characterValidator,
      ]),
      percentage: new FormControl('', [
        Validators.required,
        Validators.maxLength(5),
        this.validation.percentageValidator,
      ]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      marksheet: new FormControl('', [
        Validators.required,
        Validators.pattern('(.*?).(pdf)$'),
      ]),
      transferCertificate: new FormControl(''),
      provisionalCertificate: new FormControl('', [
        Validators.pattern('(.*?).(pdf)$'),
      ]),
      convocationCertificate: new FormControl('', [
        Validators.pattern('(.*?).(pdf)$'),
      ]),
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.dialogPGForm.controls['education'].setValue(this.editData.type);
      this.dialogPGForm.controls['board'].setValue(this.editData.board);
      this.dialogPGForm.controls['School'].setValue(this.editData.name);
      this.dialogPGForm.controls['percentage'].setValue(this.editData.marks);
      this.dialogPGForm.controls['course'].setValue(this.editData.course);
      this.dialogPGForm.controls['specialization'].setValue(
        this.editData.specialization
      );
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
    this.dialogPGForm.value.created_at = this.editData.created_at;
    if(typeof(this.dialogPGForm.value.startDate)!='string'){
      this.dialogPGForm.value.startDate = `${this.dialogPGForm.value.startDate._i.year}-${
        this.dialogPGForm.value.startDate._i.month + 1
      }-${this.dialogPGForm.value.startDate._i.date}`;
      this.dialogPGForm.value.startDate = this.pipe.transform(
        this.dialogPGForm.value.startDate,
        'YYYY-MM-dd'
      );
    }else{
      this.dialogPGForm.value.startDate = this.pipe.transform(
        this.dialogPGForm.value.startDate,
        'YYYY-MM-dd'
      );
    }
    if(typeof(this.dialogPGForm.value.endDate)!='string'){
      this.dialogPGForm.value.endDate = `${this.dialogPGForm.value.endDate._i.year}-${
        this.dialogPGForm.value.endDate._i.month + 1
      }-${this.dialogPGForm.value.endDate._i.date}`;
      this.dialogPGForm.value.endDate = this.pipe.transform(
        this.dialogPGForm.value.endDate,
        'YYYY-MM-dd'
      );
    }else{
      this.dialogPGForm.value.endDate = this.pipe.transform(
        this.dialogPGForm.value.endDate,
        'YYYY-MM-dd'
      );
    }
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
  getErrorMessage() {
    // console.log('entering');
    if (
      this.dialogPGForm.get('board')?.getError('required') ||
      this.dialogPGForm.get('School')?.getError('required') ||
      this.dialogPGForm.get('Percentage')?.getError('required') ||
      this.dialogPGForm.get('startDate')?.getError('required') ||
      this.dialogPGForm.get('endDate')?.getError('required')
    ) {
      return 'You must enter a value';
    }
    if (
      this.dialogPGForm.get('marksheet')?.getError('required') ||
      this.dialogPGForm.get('convocationCertificate')?.getError('required')
    ) {
      return 'Please select a file';
    }

    return '';
  }
  dateValidators() {
    console.log('s');

    let start = this.dialogPGForm.value.startDate;

    let end = this.dialogPGForm.value.endDate;

    if (
      Date.parse(`${start._i.year}-${start._i.month + 1}-${start._i.date}`) >=
      Date.parse(`${end._i.year}-${end._i.month + 1}-${end._i.date}`)
    ) {
      console.log(
        Date.parse(`${start._i.year}-${start._i.month + 1}-${start._i.date}`) >=
          Date.parse(`${end._i.year}-${end._i.month + 1}-${end._i.date}`)
      );

      this.dateValidator = false;

      console.log(this.dateValidator);
    } else {
      this.dateValidator = true;
    }
  }
}
