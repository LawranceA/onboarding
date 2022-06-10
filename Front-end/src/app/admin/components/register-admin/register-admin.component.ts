import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { CustomValidationService } from 'src/app/user/services/custom-validation.service';
import { Admin } from '../../admin';
import { AdminService } from '../../services/admin.service';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css'],
})
export class RegisterAdminComponent implements OnInit {
  faCircleArrowLeft=faCircleArrowLeft
  faUserPlus=faUserPlus
  admin: Admin = new Admin();

  designations = [
    'Human Resource',];
  //   'Sales Engineer',
  //   'Data Engineer',
  //   'BI & Analytics',
  //   'Data Science',
  //   'Advanced Analytics',
  //   'Full Stack',
  // ];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: AdminService,
    private tokenStorage: TokenStorageService,
    public validation: CustomValidationService
  ) {}
  regForm = new FormGroup({
    id: new FormControl('', [Validators.required,Validators.pattern('^[DB]{2}[0-9]{4}$')]),
    name: new FormControl('', [Validators.minLength(3), Validators.required,this.validation.characterValidator]),
    email: new FormControl('', [Validators.required, Validators.email, this.validation.emailValidator]),
    phone_number: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.pattern('^[6-9]{1}[0-9]{9}$'),
    ]),
    designation: new FormControl('', Validators.required),
  });
  ngOnInit(): void {}
 

  addAdmin() {
    this.service.addAdmin(this.admin).subscribe((data) => {
      console.log(data);
      this.service.setStatus({ status: data.message, user: 'Admin' });
    });
    this.router.navigate(['../registerStatus'], { relativeTo: this.route });
  }

  register(e: Event) {
    e.preventDefault();
    
    this.admin = this.regForm.value;
    this.admin.created_at = new Date();
    this.admin.created_by_admin = this.tokenStorage.getName();
    console.log(this.regForm.value);
    this.addAdmin();
  }
}
