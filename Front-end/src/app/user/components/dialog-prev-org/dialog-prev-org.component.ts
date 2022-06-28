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

@Component({
  selector: 'app-dialog-prev-org',
  templateUrl: './dialog-prev-org.component.html',
  styleUrls: ['./dialog-prev-org.component.css'],
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
export class DialogPrevOrgComponent implements OnInit {

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
    private dialogRef: MatDialogRef<DialogPrevOrgComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    public validation: CustomValidationService,
    private pipe: DatePipe
  ) {}

  ngOnInit(): void {
 console.log(this.editData)
    this.organization = this.fs.group({
      organizationName: ['', [Validators.required,this.validation.characterValidator]],
      joiningDate: ['',Validators.required],
      relievingDate: ['',Validators.required],
      hr_name: ['', [this.validation.characterValidator]],
      relievingLetter: ['', [Validators.required,Validators.pattern('(.*?).(pdf)$')]],
      rlSrc: [''],
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
      this.organization.controls['relievingLetter'].setValue(
        this.editData.relieving_letter
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
  console.log(typeof(this.organization.value.joiningDate))
    if (typeof this.organization.value.joiningDate != 'string') {
      let joiningDate = `${this.organization.value.joiningDate._i.year}-${
        this.organization.value.joiningDate._i.month + 1
      }-${this.organization.value.joiningDate._i.date}`;
      this.form.set(
        'joining_date',
        `${this.pipe.transform(joiningDate, 'YYYY-MM-dd')}`
      );
    } else {
      this.form.set(
        'joining_date',
        `${this.pipe.transform(
          this.organization.value.joiningDate,
          'YYYY-MM-dd'
        )}`
      );
    }
    console.log(typeof(this.organization.value.joiningDate))
    if (typeof this.organization.value.relievingDate != 'string') {
      let relievingDate = `${this.organization.value.relievingDate._i.year}-${
        this.organization.value.relievingDate._i.month + 1
      }-${this.organization.value.relievingDate._i.date}`;
      this.form.set(
        'relieving_date',
        `${this.pipe.transform(relievingDate, 'YYYY-MM-dd')}`
      );
    } else {
      this.form.set(
        'relieving_date',
        `${this.pipe.transform(
          this.organization.value.relievingDate,
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
    this.form.append("type","Previous")
    this.form.append(
      'org_name',
      this.organization.get('organizationName')?.value
    );
    this.form.append('hr_name', this.organization.get('hr_name')?.value);

    let jDate = `${this.organization.value.joiningDate._i.year}-${
      this.organization.value.joiningDate._i.month + 1
    }-${this.organization.value.joiningDate._i.date}`;
    this.form.append(
      'joining_date',
      `${this.pipe.transform(jDate, 'YYYY-MM-dd')}`
    );
    let rDate = `${this.organization.value.relievingDate._i.year}-${
      this.organization.value.relievingDate._i.month + 1
    }-${this.organization.value.relievingDate._i.date}`;
    this.form.append(
      'relieving_date',
      `${this.pipe.transform(rDate, 'YYYY-MM-dd')}`
    );
    this.form.append('relieving_letter', this.organization.get('rlSrc')?.value);
    this.form.append('updated_by', this.tokenStorage.getName());
    this.form.append('created_at', `${new Date()}`);
    this.form.append('fk_employment_users_id', this.tokenStorage.getID());
  }
  setForms() {
    this.form.set("type","Previous")
    this.form.set(
      'org_name',
      this.organization.get('organizationName')?.value
    );
    this.form.set('hr_name', this.organization.get('hr_name')?.value);
    this.form.set('relieving_letter', this.organization.get('rlSrc')?.value);
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
      this.organization.get('rlSrc')?.updateValueAndValidity();
    } 
  }

}
