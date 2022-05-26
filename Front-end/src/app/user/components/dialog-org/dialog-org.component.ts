import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SharedService } from '../../services/shared.service';
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
  selector: 'app-dialog-org',
  templateUrl: './dialog-org.component.html',
  styleUrls: ['./dialog-org.component.css'],
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
export class DialogOrgComponent implements OnInit {
  organization!: FormGroup;
  actionBtn: String = 'Save';
  created_at: any;

  dateValidator = true

  constructor(
    private fs: FormBuilder,
    private api: SharedService,
    private tokenStorage: TokenStorageService,
    private dialogRef: MatDialogRef<DialogOrgComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    public validation: CustomValidationService
  ) {}

  ngOnInit(): void {
    this.organization = this.fs.group({
      organizationName: ['',  [Validators.required, this.validation.characterValidator]],
      joiningDate: ['', Validators.required],
      relievingDate: ['', Validators.required],
      hr_name: ['',  [Validators.required, this.validation.characterValidator]],
      relievingLetter: ['', [Validators.required,Validators.pattern("(.*?)\.(pdf)$")]],
      offerLetter: ['',  [Validators.required,Validators.pattern("(.*?)\.(pdf)$")]],
      payslip1: ['', [Validators.required,Validators.pattern("(.*?)\.(pdf)$")]],
      payslip2: ['',  [Validators.required,Validators.pattern("(.*?)\.(pdf)$")]],
      payslip3: ['',  [Validators.required,Validators.pattern("(.*?)\.(pdf)$")]],
      noticePeriodEndDate: ['', Validators.required],
    });

    //  console.log(this.editData)
    if (this.editData) {
      this.actionBtn = 'Update';
      this.organization.controls['organizationName'].setValue(
        this.editData.org_name
      );
      this.organization.controls['joiningDate'].setValue(
        this.editData.joining_date
      );
      this.organization.controls['relievingDate'].setValue(
        this.editData.relieving_date
      );
      this.organization.controls['hr_name'].setValue(this.editData.hr_name);
      // this.organization.controls['relievingLetter'].setValue(
      //   this.editData.relieving_letter
      // );
      // this.organization.controls['offerLetter'].setValue(
      //   this.editData.offer_letter
      // );

      // this.organization.controls['payslip1'].setValue(this.editData.pay_slip1);
      // this.organization.controls['payslip2'].setValue(this.editData.pay_slip2);
      // this.organization.controls['payslip3'].setValue(this.editData.pay_slip3);
      this.organization.controls['noticePeriodEndDate'].setValue(
        this.editData.notice_date
      );
    }
  }
  addOrganization() {
    // console.log(this.organization.value)
    this.organization.value.created_at = new Date();
    this.organization.value.updated_at = new Date();
    this.organization.value.updated_by = this.tokenStorage.getName();
    this.organization.value.fk_employment_users_id = this.tokenStorage.getID();
    if (!this.editData) {
      if (this.organization.valid) {
        this.api.postOrganization(this.organization.value).subscribe({
          next: (res) => {
            alert('Organization added successfully');
            this.organization.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('Error while adding the organization');
          },
        });
      }
    } else {
      this.updateOrganization();
    }
  }

  updateOrganization() {
    this.organization.value.created_at = this.editData.created_at;
    this.api
      .putOrganization(this.organization.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert('Organization Updated successfully');
          this.organization.reset();
          this.dialogRef.close('updated');
        },
        error: (err) => {
          alert('Error while updating the record??' + err);
        },
      });
  }
  getErrorMessage() {
    // console.log('entering');
    if (
      this.organization.get('organizationName')?.getError('required') ||
      this.organization.get('joiningDate')?.getError('required') ||
      this.organization.get('relievingDate')?.getError('required') ||
      this.organization.get('hr_name')?.getError('required') ||
      this.organization.get('noticePeriodEndDate')?.getError('required') 
      ) {
      return 'You must enter a value';
    }
    if (
      this.organization.get('relievingLetter')?.getError('required') ||
      this.organization.get('offerLetter')?.getError('required') ||
      this.organization.get('payslip1')?.getError('required') ||
    this.organization.get('payslip2')?.getError('required') ||
    this.organization.get('payslip3')?.getError('required')) {
      return 'You must upload a file';
    }
    return '';
    
  }
  dateValidators() {
    console.log('s');

    let start = this.organization.value.joiningDate;

    let end = this.organization.value.relievingDate;

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
