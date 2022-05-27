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

  dateValidator = true

  constructor(
    private fs: FormBuilder,
    private tokenStorage: TokenStorageService,
    private dialogRef: MatDialogRef<Dialog12Component>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private api: Dialog10serviceService,
    public validation: CustomValidationService,
    private pipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.dialog12Form = this.fs.group({
      education: ['12th', Validators.required],
      board: ['', [Validators.required, this.validation.characterValidator]],
      School: ['',[Validators.required, this.validation.characterValidator]],
      percentage: ['',[
        Validators.required,
        Validators.maxLength(5),
        this.validation.percentageValidator,
      ]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      marksheet: ['',[Validators.required,Validators.pattern("(.*?)\.(pdf)$")]],
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
    this.dialog12Form.value.startDate = `${this.dialog12Form.value.startDate._i.year}-${
      this.dialog12Form.value.startDate._i.month + 1
    }-${this.dialog12Form.value.startDate._i.date}`;
    this.dialog12Form.value.startDate = this.pipe.transform(
      this.dialog12Form.value.startDate,
      'YYYY-MM-dd'
    );
    this.dialog12Form.value.endDate = `${this.dialog12Form.value.endDate._i.year}-${
      this.dialog12Form.value.endDate._i.month + 1
    }-${this.dialog12Form.value.endDate._i.date}`;
    this.dialog12Form.value.endDate = this.pipe.transform(
      this.dialog12Form.value.endDate,
      'YYYY-MM-dd'
    );
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
  getErrorMessage() {
    // console.log('entering');
    if (
      this.dialog12Form.get('board')?.getError('required') ||
      this.dialog12Form.get('School')?.getError('required') ||
      this.dialog12Form.get('Percentage')?.getError('required') ||
      this.dialog12Form.get('startDate')?.getError('required') ||
      this.dialog12Form.get('endDate')?.getError('required')
    ) {
      return 'You must enter a value';
    }
    if (this.dialog12Form.get('marksheet')?.getError('required')) {
      return 'Please select a file';
    }
    return '';
  }

  dateValidators(){ 

    console.log("s") 

    let start=this.dialog12Form.value.startDate 

    let end= this.dialog12Form.value.endDate 

    if(Date.parse(`${start._i.year}-${start._i.month+1}-${start._i.date}`)>=Date.parse(`${end._i.year}-${end._i.month+1}-${end._i.date}`)){ 

      console.log(Date.parse(`${start._i.year}-${start._i.month+1}-${start._i.date}`)>=Date.parse(`${end._i.year}-${end._i.month+1}-${end._i.date}`)) 

        this.dateValidator=false 

        console.log(this.dateValidator) 

    }else{ 

      this.dateValidator=true 

    } 

  } 
}

// add12Form(){
//   console.log(this.dialog12Form.value)
// }
