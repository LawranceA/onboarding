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

  dateValidator = true

  constructor(
    private fs: FormBuilder,
    private api: Dialog10serviceService,
    private tokenStorage: TokenStorageService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    public validation: CustomValidationService
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

      marksheet: ['', [Validators.required,Validators.pattern("(.*?)\.(pdf)$")]],

      transferCertificate: [''],
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
      this.dialog10Form.controls['marksheet'].setValue(
        this.editData.marks_card
      );
      this.dialog10Form.controls['transferCertificate'].setValue(
        this.editData.transfer_certificate
      );
    }
  }

  // Adding the 10 education data
  add10Form() {
    console.log(this.dialog10Form);
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
      this.dialog10Form.get('Percentage')?.getError('required') ||
      this.dialog10Form.get('startDate')?.getError('required') ||
      this.dialog10Form.get('endDate')?.getError('required')
    ) {
      return 'You must enter a value';
    }
    if (this.dialog10Form.get('marksheet')?.getError('required')) {
      return 'Please select a file';
    }

    return '';
  }
  
  dateValidators(){

    console.log("s")

    let start=this.dialog10Form.value.startDate

    let end= this.dialog10Form.value.endDate

    if(Date.parse(`${start._i.year}-${start._i.month+1}-${start._i.date}`)>=Date.parse(`${end._i.year}-${end._i.month+1}-${end._i.date}`)){

      console.log(Date.parse(`${start._i.year}-${start._i.month+1}-${start._i.date}`)>=Date.parse(`${end._i.year}-${end._i.month+1}-${end._i.date}`))

        this.dateValidator=false

        console.log(this.dateValidator)

    }else{

      this.dateValidator=true

    }

  }
}
