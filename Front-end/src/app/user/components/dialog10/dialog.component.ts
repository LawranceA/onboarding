import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Dialog10serviceService } from '../../services/dialog10service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/services/token-storage.service';

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
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
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
export class DialogComponent implements OnInit {
  dialog10Form!: FormGroup;
  actionBtn: String = 'Save';

  dateValidator = true;
  //formData
  formPost = new FormData();
  

  constructor(
    private fs: FormBuilder,
    private api: Dialog10serviceService,
    private tokenStorage: TokenStorageService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    public validation: CustomValidationService,
    private pipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.dialog10Form = this.fs.group({
      education: ['10th', Validators.required],

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

      endDate: ['', [Validators.required]],

      marksheet: [
        '',
        [Validators.required, Validators.pattern('(.*?).(pdf)$')],
      ],

      marksheetSrc: [''],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.dialog10Form.controls['education'].setValue(this.editData.type);
      this.dialog10Form.controls['board'].setValue(this.editData.board);
      this.dialog10Form.controls['School'].setValue(this.editData.name);
      this.dialog10Form.controls['percentage'].setValue(this.editData.marks);
      this.dialog10Form.controls['startDate'].setValue(
        this.editData.start_date
      );
      this.dialog10Form.controls['endDate'].setValue(this.editData.end_date);
     
    }
  }

  // Adding the 10 education data
  add10Form() {
    if (!this.editData) {
      if (this.dialog10Form.valid) {
        this.appendForms();
      
        this.api.postEducation(this.formPost).subscribe({
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
      console.log('entering');
      this.updateData();
    }
  }
  appendForms() {
    this.formPost.append(
      'education',
      this.dialog10Form.get('education')?.value
    );
    this.formPost.append('board', this.dialog10Form.get('board')?.value);
    this.formPost.append('School', this.dialog10Form.get('School')?.value);
    this.formPost.append(
      'percentage',
      this.dialog10Form.get('percentage')?.value
    );
    let sDate = `${this.dialog10Form.value.startDate._i.year}-${
      this.dialog10Form.value.startDate._i.month + 1
    }-${this.dialog10Form.value.startDate._i.date}`;
    this.formPost.append(
      'startDate',
      `${this.pipe.transform(sDate, 'YYYY-MM-dd')}`
    );
    let eDate = `${this.dialog10Form.value.endDate._i.year}-${
      this.dialog10Form.value.endDate._i.month + 1
    }-${this.dialog10Form.value.endDate._i.date}`;
    this.formPost.append(
      'endDate',
      `${this.pipe.transform(eDate, 'YYYY-MM-dd')}`
    );
    this.formPost.append(
      'marksheet',
      this.dialog10Form.get('marksheetSrc')?.value
    );
    this.formPost.append('updated_at', `${new Date()}`);
    console.log(`date---------${(new Date().toISOString())}`)
    this.formPost.append('updated_by', this.tokenStorage.getName());
    this.formPost.append('created_at', `${new Date()}`);
    this.formPost.append('fk_education_users_id', this.tokenStorage.getID());
  }
  setForms(){
    this.formPost.set(
      'education',
      this.dialog10Form.get('education')?.value
    );
    this.formPost.set('board', this.dialog10Form.get('board')?.value);
    this.formPost.set('School', this.dialog10Form.get('School')?.value);
    this.formPost.set('course', this.dialog10Form.get('course')?.value);
    this.formPost.set('specialization', this.dialog10Form.get('specialization')?.value);
    this.formPost.set(
      'percentage',
      this.dialog10Form.get('percentage')?.value
    );
    this.formPost.set(
      'marksheet',
      this.dialog10Form.get('marksheetSrc')?.value
    );
    this.formPost.set('updated_at', `${new Date()}`);
    this.formPost.set('updated_by', this.tokenStorage.getName());
    this.formPost.set('fk_education_users_id', this.tokenStorage.getID());
  }
  updateData() {
    this.setForms()
    this.formPost.set('created_at', this.editData.created_at);
    if (typeof this.dialog10Form.value.startDate != 'string') {
      let startDate = `${
        this.dialog10Form.value.startDate._i.year
      }-${this.dialog10Form.value.startDate._i.month + 1}-${
        this.dialog10Form.value.startDate._i.date
      }`;
      this.formPost.set("startDate",`${this.pipe.transform(
        startDate,
        'YYYY-MM-dd'
      )}`)
    } else {
      this.formPost.set("startDate",`${this.pipe.transform(
        this.dialog10Form.value.startDate,
        'YYYY-MM-dd'
      )}`)
    }
    if (typeof this.dialog10Form.value.endDate != 'string') {
      let endDate = `${
        this.dialog10Form.value.endDate._i.year
      }-${this.dialog10Form.value.endDate._i.month + 1}-${
        this.dialog10Form.value.endDate._i.date
      }`;
      this.formPost.set("endDate",`${this.pipe.transform(
        endDate,
        'YYYY-MM-dd'
      )}`)
    } else {
      this.formPost.set("endDate",`${this.pipe.transform(
        this.dialog10Form.value.endDate,
        'YYYY-MM-dd'
      )}`)
    }
    this.api.putEduaction(this.formPost, this.editData.id).subscribe({
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
  // getErrorMessage() {
  //   if (
  //     this.dialog10Form.get('board')?.getError('required') ||
  //     this.dialog10Form.get('School')?.getError('required') ||
  //     this.dialog10Form.get('Percentage')?.getError('required') ||
  //     this.dialog10Form.get('startDate')?.getError('required') ||
  //     this.dialog10Form.get('endDate')?.getError('required')
  //   ) {
  //     return 'You must enter a value';
  //   }
  //   if (this.dialog10Form.get('marksheet')?.getError('required')) {
  //     return 'Please select a file';
  //   }

  //   return '';
  // }

  dateValidators() {
    console.log('s');

    let start = this.dialog10Form.value.startDate;

    let end = this.dialog10Form.value.endDate;

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

  //file change Handler
  fileChange(e: any) {
    console.log(e.target.files);
    let extensionAllowed = { png: true, jpeg: true };
    const file = e.target.files[0];

    if (e.target.files[0].size / 1024 / 1024 > 1) {
      alert('File size should be less than 1MB');
      return;
    }

    this.dialog10Form.patchValue({
      marksheetSrc: file,
    });

    this.dialog10Form.get('marksheetSrc')?.updateValueAndValidity();
  }
}
