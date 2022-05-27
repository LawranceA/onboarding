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
  selector: 'app-dialog-ug',
  templateUrl: './dialog-ug.component.html',
  styleUrls: ['./dialog-ug.component.css'],
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
export class DialogUGComponent implements OnInit {
  dialogUGForm!: FormGroup;
  actionBtn: String = 'Save';

  dateValidator = true

  constructor(
    private fs: FormBuilder,
    private tokenStorage: TokenStorageService,
    private dialogRef: MatDialogRef<DialogUGComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private api: Dialog10serviceService,
    public validation: CustomValidationService,
    private pipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.dialogUGForm = new FormGroup({
      education: new FormControl('Graduation/Diploma'),
      School: new FormControl('',  [Validators.required, this.validation.characterValidator]),
      course: new FormControl('',  [Validators.required, this.validation.characterValidator]),
      specialization: new FormControl('',  [Validators.required, this.validation.characterValidator]),
      board: new FormControl('',  [Validators.required, this.validation.characterValidator]),
      percentage: new FormControl('',[
        Validators.required,
        Validators.maxLength(5),
        this.validation.percentageValidator,
      ]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      marksheet: new FormControl('', [Validators.required,Validators.pattern("(.*?)\.(pdf)$")]),
      transferCertificate: new FormControl(''),
      provisionalCertificate: new FormControl('',[Validators.pattern("(.*?)\.(pdf)$")]),
      convocationCertificate: new FormControl('',[Validators.pattern("(.*?)\.(pdf)$")]),
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
    if (!this.editData) {
    this.dialogUGForm.value.startDate = `${this.dialogUGForm.value.startDate._i.year}-${
      this.dialogUGForm.value.startDate._i.month + 1
    }-${this.dialogUGForm.value.startDate._i.date}`;
    this.dialogUGForm.value.startDate = this.pipe.transform(
      this.dialogUGForm.value.startDate,
      'YYYY-MM-dd'
    );
    this.dialogUGForm.value.endDate = `${this.dialogUGForm.value.endDate._i.year}-${
      this.dialogUGForm.value.endDate._i.month + 1
    }-${this.dialogUGForm.value.endDate._i.date}`;
    this.dialogUGForm.value.endDate = this.pipe.transform(
      this.dialogUGForm.value.endDate,
      'YYYY-MM-dd'
    );
    this.dialogUGForm.value.created_at = new Date();
    this.dialogUGForm.value.updated_at = new Date();
    this.dialogUGForm.value.updated_by = this.tokenStorage.getName();
    this.dialogUGForm.value.fk_education_users_id = this.tokenStorage.getID();
   
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
  getErrorMessage() {
    // console.log('entering');
    if (
      this.dialogUGForm.get('board')?.getError('required') ||
      this.dialogUGForm.get('School')?.getError('required') ||
      this.dialogUGForm.get('Percentage')?.getError('required')||
      this.dialogUGForm.get('startDate')?.getError('required') ||
      this.dialogUGForm.get('endDate')?.getError('required')
    ) {
      return 'You must enter a value';
    }
    if (
      this.dialogUGForm.get('marksheet')?.getError('required')  ||
      this.dialogUGForm.get('convocationCertificate')?.getError('required') )  {
      return 'Please select a file';
    }
    
    return '';
  }
  dateValidators(){ 

    console.log("s") 

    let start=this.dialogUGForm.value.startDate 

    let end= this.dialogUGForm.value.endDate 

    if(Date.parse(`${start._i.year}-${start._i.month+1}-${start._i.date}`)>=Date.parse(`${end._i.year}-${end._i.month+1}-${end._i.date}`)){ 

      console.log(Date.parse(`${start._i.year}-${start._i.month+1}-${start._i.date}`)>=Date.parse(`${end._i.year}-${end._i.month+1}-${end._i.date}`)) 

        this.dateValidator=false 

        console.log(this.dateValidator) 

    }else{ 

      this.dateValidator=true 

    } 

  } 
}
