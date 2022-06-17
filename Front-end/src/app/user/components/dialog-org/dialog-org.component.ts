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
import { DatePipe } from '@angular/common';
import { DialogData } from '../employment-details/employment-details.component';

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
  //required
  required=true
  dateValidator = true;
  //formData
  form = new FormData();
  constructor(
    private fs: FormBuilder,
    private api: SharedService,
    private tokenStorage: TokenStorageService,
    private dialogRef: MatDialogRef<DialogOrgComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public validation: CustomValidationService,
    private pipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.organization = this.fs.group({
      organizationName: ['', [Validators.required,this.validation.characterValidator]],
      joiningDate: ['',Validators.required],
      relievingDate: ['',Validators.required],
      hr_name: ['', [this.validation.characterValidator]],
      relievingLetter: ['', [Validators.required,Validators.pattern('(.*?).(pdf)$')]],
      rlSrc: [''],
      offerLetter: ['', [Validators.required,Validators.pattern('(.*?).(pdf)$')]],
      olSrc: [''],
      payslip1: ['', [Validators.required,Validators.pattern('(.*?).(pdf)$')]],
      ps1Src: [''],
      payslip2: ['', [Validators.required,Validators.pattern('(.*?).(pdf)$')]],
      ps2Src: [''],
      payslip3: ['', [Validators.required,Validators.pattern('(.*?).(pdf)$')]],
      ps3Src: [''],
      noticePeriodEndDate: ['',Validators.required],
    });
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
      this.organization.controls['relievingLetter'].setValue(this.editData.relieving_letter);
      this.organization.controls['offerLetter'].setValue(this.editData.offer_letter);
      this.organization.controls['payslip1'].setValue(this.editData.pay_slip1);
      this.organization.controls['payslip2'].setValue(this.editData.pay_slip2);
      this.organization.controls['payslip3'].setValue(this.editData.pay_slip3);
      this.organization.controls['noticePeriodEndDate'].setValue(
        this.editData.notice_date
      );
    }
  }
  addOrganization() {
    if (!this.editData) {
      if (this.organization.valid) {
        this.appendForms();
        this.api.postOrganization(this.form).subscribe({
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
    this.setForms();
    this.form.set('created_at', this.editData.created_at);
    if (typeof this.organization.value.joiningDate != 'string') {
      let joiningDate = `${this.organization.value.joiningDate._i.year}-${
        this.organization.value.joiningDate._i.month + 1
      }-${this.organization.value.joiningDate._i.date}`;
      this.form.set(
        'joiningDate',
        `${this.pipe.transform(joiningDate, 'YYYY-MM-dd')}`
      );
    } else {
      this.form.set(
        'joiningDate',
        `${this.pipe.transform(
          this.organization.value.joiningDate,
          'YYYY-MM-dd'
        )}`
      );
    }
    if (typeof this.organization.value.relievingDate != 'string') {
      let relievingDate = `${this.organization.value.relievingDate._i.year}-${
        this.organization.value.relievingDate._i.month + 1
      }-${this.organization.value.relievingDate._i.date}`;
      this.form.set(
        'relievingDate',
        `${this.pipe.transform(relievingDate, 'YYYY-MM-dd')}`
      );
    } else {
      this.form.set(
        'relievingDate',
        `${this.pipe.transform(
          this.organization.value.relievingDate,
          'YYYY-MM-dd'
        )}`
      );
    }
    if (typeof this.organization.value.noticePeriodEndDate != 'string') {
      let noticePeriodEndDate = `${
        this.organization.value.noticePeriodEndDate._i.year
      }-${this.organization.value.noticePeriodEndDate._i.month + 1}-${
        this.organization.value.noticePeriodEndDate._i.date
      }`;
      this.form.set(
        'noticePeriodEndDate',
        `${this.pipe.transform(noticePeriodEndDate, 'YYYY-MM-dd')}`
      );
    } else {
      this.form.set(
        'noticePeriodEndDate',
        `${this.pipe.transform(
          this.organization.value.noticePeriodEndDate,
          'YYYY-MM-dd'
        )}`
      );
    }
    this.api.putOrganization(this.form, this.editData.id).subscribe({
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
  appendForms() {
    this.form.append("type","Recent")
    this.form.append(
      'organizationName',
      this.organization.get('organizationName')?.value
    );
    this.form.append('hr_name', this.organization.get('hr_name')?.value);

    let jDate = `${this.organization.value.joiningDate._i.year}-${
      this.organization.value.joiningDate._i.month + 1
    }-${this.organization.value.joiningDate._i.date}`;
    this.form.append(
      'joiningDate',
      `${this.pipe.transform(jDate, 'YYYY-MM-dd')}`
    );
    let rDate = `${this.organization.value.relievingDate._i.year}-${
      this.organization.value.relievingDate._i.month + 1
    }-${this.organization.value.relievingDate._i.date}`;
    this.form.append(
      'relievingDate',
      `${this.pipe.transform(rDate, 'YYYY-MM-dd')}`
    );
    let nDate = `${this.organization.value.noticePeriodEndDate._i.year}-${
      this.organization.value.noticePeriodEndDate._i.month + 1
    }-${this.organization.value.noticePeriodEndDate._i.date}`;
    this.form.append(
      'noticePeriodEndDate',
      `${this.pipe.transform(nDate, 'YYYY-MM-dd')}`
    );
    this.form.append('relievingLetter', this.organization.get('rlSrc')?.value);
    this.form.append('offerLetter', this.organization.get('olSrc')?.value);
    this.form.append('payslip1', this.organization.get('ps1Src')?.value);
    this.form.append('payslip2', this.organization.get('ps2Src')?.value);
    this.form.append('payslip3', this.organization.get('ps3Src')?.value);
    this.form.append('updated_at', `${new Date()}`);
    this.form.append('updated_by', this.tokenStorage.getName());
    this.form.append('created_at', `${new Date()}`);
    this.form.append('fk_employment_users_id', this.tokenStorage.getID());
  }
  setForms() {
    this.form.set("type","Recent")
    this.form.set(
      'organizationName',
      this.organization.get('organizationName')?.value
    );
    this.form.set('hr_name', this.organization.get('hr_name')?.value);
    this.form.set('relievingLetter', this.organization.get('rlSrc')?.value);
    this.form.set('offerLetter', this.organization.get('olSrc')?.value);
    this.form.set('payslip1', this.organization.get('ps1Src')?.value);
    this.form.set('payslip2', this.organization.get('ps2Src')?.value);
    this.form.set('payslip3', this.organization.get('ps3Src')?.value);
    this.form.set('updated_at', `${new Date()}`);
    this.form.set('updated_by', this.tokenStorage.getName());
    this.form.set('fk_employment_users_id', this.tokenStorage.getID());
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
  //file change handler
  fileChange(e: any, control: any) {
    console.log(e.target.files);
    let extensionAllowed = { png: true, jpeg: true };
    const file = e.target.files[0];
    if (e.target.files[0].size / 1024 / 1024 > 1) {
      alert('File size should be less than 1MB');
      return;
    }
    if (control == 'rl') {
      this.organization.patchValue({
        rlSrc: file,
      });
      this.organization.patchValue({
        relievingLetter: file.name,
      });
      this.organization.get('rlSrc')?.updateValueAndValidity();
    } else if (control == 'ol') {
      this.organization.patchValue({
        olSrc: file,
      });
      this.organization.patchValue({
        offerLetter: file.name,
      });
      this.organization.get('olSrc')?.updateValueAndValidity();
    } else if (control == 'ps1') {
      this.organization.patchValue({
        ps1Src: file,
      });
      this.organization.patchValue({
        payslip1: file.name,
      });
      this.organization.get('ps1Src')?.updateValueAndValidity();
    } else if (control == 'ps2') {
      this.organization.patchValue({
        ps2Src: file,
      });
      this.organization.patchValue({
        payslip2: file.name,
      });
      
      this.organization.get('ps2Src')?.updateValueAndValidity();
    } else if (control == 'ps3') {
      this.organization.patchValue({
        ps3Src: file,
      });
      this.organization.patchValue({
        payslip3: file.name,
      });
      this.organization.get('ps3Src')?.updateValueAndValidity();
    }
  }
}
