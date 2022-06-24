import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Dialog10serviceService } from '../../services/dialog10service.service';

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
import { DatePipe, formatDate, JsonPipe } from '@angular/common';
@Component({
  selector: 'app-dialog12',
  templateUrl: './dialog12.component.html',
  styleUrls: ['./dialog12.component.css'],
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
export class Dialog12Component implements OnInit {
  dialog12Form!: FormGroup;
  actionBtn: String = 'Save';

  dateValidator = true;
  //formData
  form = new FormData();

  constructor(
    private fs: FormBuilder,
    private tokenStorage: TokenStorageService,
    private dialogRef: MatDialogRef<Dialog12Component>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private api: Dialog10serviceService,
    public validation: CustomValidationService,
    private pipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.dialog12Form = this.fs.group({
      education: ['12th', Validators.required],
      board: ['', [Validators.required, this.validation.characterValidator]],
      School: ['', [Validators.required, this.validation.characterValidator]],
      percentage: [
        '',
        [
          Validators.required,
          Validators.maxLength(5),
          this.validation.percentageValidator,
        ],
      ],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      marksheet: [
        '',
        [Validators.required, Validators.pattern('(.*?).(pdf)$')],
      ],
      marksheetSrc: [''],
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
    if (!this.editData) {
      if (this.dialog12Form.valid) {
        this.appendForms();
        this.api.postEducation(this.form).subscribe({
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
    this.setForms();
    this.form.set('created_at', this.editData.created_at);
    if (typeof this.dialog12Form.value.startDate != 'string') {
      let startDate = `${this.dialog12Form.value.startDate._i.year}-${
        this.dialog12Form.value.startDate._i.month + 1
      }-${this.dialog12Form.value.startDate._i.date}`;
      this.form.set(
        'startDate',
        `${this.pipe.transform(startDate, 'YYYY-MM-dd')}`
      );
    } else {
      this.form.set(
        'startDate',
        `${this.pipe.transform(
          this.dialog12Form.value.startDate,
          'YYYY-MM-dd'
        )}`
      );
    }
    if (typeof this.dialog12Form.value.endDate != 'string') {
      let endDate = `${this.dialog12Form.value.endDate._i.year}-${
        this.dialog12Form.value.endDate._i.month + 1
      }-${this.dialog12Form.value.endDate._i.date}`;
      this.form.set('endDate', `${this.pipe.transform(endDate, 'YYYY-MM-dd')}`);
    } else {
      this.form.set(
        'endDate',
        `${this.pipe.transform(this.dialog12Form.value.endDate, 'YYYY-MM-dd')}`
      );
    }
    this.api.putEduaction(this.form, this.editData.id).subscribe({
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
  appendForms() {
    this.form.append('education', this.dialog12Form.get('education')?.value);
    this.form.append('board', this.dialog12Form.get('board')?.value);
    this.form.append('School', this.dialog12Form.get('School')?.value);
    this.form.append('percentage', this.dialog12Form.get('percentage')?.value);
    let sDate = `${this.dialog12Form.value.startDate._i.year}-${
      this.dialog12Form.value.startDate._i.month + 1
    }-${this.dialog12Form.value.startDate._i.date}`;
    this.form.append(
      'startDate',
      `${this.pipe.transform(sDate, 'YYYY-MM-dd')}`
    );
    let eDate = `${this.dialog12Form.value.endDate._i.year}-${
      this.dialog12Form.value.endDate._i.month + 1
    }-${this.dialog12Form.value.endDate._i.date}`;
    this.form.append('endDate', `${this.pipe.transform(eDate, 'YYYY-MM-dd')}`);
    this.form.append('marksheet', this.dialog12Form.get('marksheetSrc')?.value);
    this.form.append('updated_at', `${new Date()}`);
    this.form.append('updated_by', this.tokenStorage.getName());
    this.form.append('created_at', `${new Date()}`);
    this.form.append('fk_education_users_id', this.tokenStorage.getID());
  }
  setForms() {
    this.form.set('education', this.dialog12Form.get('education')?.value);
    this.form.set('board', this.dialog12Form.get('board')?.value);
    this.form.set('School', this.dialog12Form.get('School')?.value);
    this.form.set('course', this.dialog12Form.get('course')?.value);
    this.form.set(
      'specialization',
      this.dialog12Form.get('specialization')?.value
    );
    this.form.set('percentage', this.dialog12Form.get('percentage')?.value);
    this.form.set('marksheet', this.dialog12Form.get('marksheetSrc')?.value);
    this.form.set('updated_at', `${new Date()}`);
    this.form.set('updated_by', this.tokenStorage.getName());
    this.form.set('fk_education_users_id', this.tokenStorage.getID());
  }
  // getErrorMessage() {
  //   if (
  //     this.dialog12Form.get('board')?.getError('required') ||
  //     this.dialog12Form.get('School')?.getError('required') ||
  //     this.dialog12Form.get('Percentage')?.getError('required') ||
  //     this.dialog12Form.get('startDate')?.getError('required') ||
  //     this.dialog12Form.get('endDate')?.getError('required')
  //   ) {
  //     return 'You must enter a value';
  //   }
  //   if (this.dialog12Form.get('marksheet')?.getError('required')) {
  //     return 'Please select a file';
  //   }
  //   return '';
  // }

  dateValidators() {
    console.log('s');
    let start = this.dialog12Form.value.startDate;
    let end = this.dialog12Form.value.endDate;
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

  fileChange(e: any) {
    console.log(e.target.files);
    let extensionAllowed = { png: true, jpeg: true };
    const file = e.target.files[0];
    if (e.target.files[0].size  > 1000000) {
      alert('File size should be less than 1MB');
      return;
    }
    this.dialog12Form.patchValue({
      marksheetSrc: file,
    });
    this.dialog12Form.get('marksheetSrc')?.updateValueAndValidity();
  }
}
