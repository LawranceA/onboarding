import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { CustomValidationService } from 'src/app/user/services/custom-validation.service';
import { AdminService } from '../../services/admin.service';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css'],
})
export class RegisterEmployeeComponent implements OnInit {
  faCircleArrowLeft = faCircleArrowLeft;
  faUserPlus = faUserPlus;
  employee: any;

  designations = [
    'Human Resource',
    'Sales Engineer',
    'Data Engineer',
    'BI & Analytics',
    'Data Science',
    'Advanced Analytics',
    'Full Stack',
  ];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: AdminService,
    private tokenStorage: TokenStorageService,
    public validation: CustomValidationService
  ) {}
  //form Data
  form = new FormData();
  regForm = new FormGroup({
    id: new FormControl('', [
      Validators.required,
      Validators.pattern('^[DB]{2}[0-9]{4}$'),
    ]),
    name: new FormControl('', [
      Validators.minLength(3),
      Validators.required,
      this.validation.characterValidator,
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      this.validation.emailValidator,
    ]),
    phone_number: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.pattern('^[6-9]{1}[0-9]{9}$'),
    ]),
    designation: new FormControl('', Validators.required),
    offerLetter: new FormControl('', [
      Validators.required,
      Validators.pattern('(.*?).(pdf)$'),
    ]),
    olSrc: new FormControl(''),
  });
  ngOnInit(): void {}
  appendForms() {
    this.form.append('id', this.regForm.get('id')?.value);
    this.form.append('name', this.regForm.get('name')?.value);
    this.form.append('email', this.regForm.get('email')?.value);
    this.form.append('phone_number', this.regForm.get('phone_number')?.value);
    this.form.append('designation', this.regForm.get('designation')?.value);
    this.form.append('offerLetter', this.regForm.get('olSrc')?.value);
    this.form.append('updated_at', `${new Date()}`);
    this.form.append('updated_by', this.tokenStorage.getName());
    this.form.append('created_at', `${new Date()}`);
    this.form.append('created_by', this.tokenStorage.getName());

    this.form.append('fk_employment_users_id', this.tokenStorage.getID());
  }
  addEmployee() {
    this.service.addEmployee(this.form).subscribe((data) => {
      console.log(data);
      this.service.setStatus({ status: data.message, user: 'Admin' });
    });
    this.router.navigate(['../registerStatus'], { relativeTo: this.route });
  }

  register(e: Event) {
    e.preventDefault();
    this.appendForms()
    this.addEmployee();
  }
  fileChange(e: any) {
    let extensionAllowed = { pdf: true };
    const file = e.target.files[0];
    if (e.target.files[0].size / 1024 / 1024 > 1) {
      alert('File size should be less than 1MB');
      return;
    }
    this.regForm.patchValue({
      offerLetter: file.name,
    });

    this.regForm.patchValue({
      olSrc: file,
    });
  }
}
