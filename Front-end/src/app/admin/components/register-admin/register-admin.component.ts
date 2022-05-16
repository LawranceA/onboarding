import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Admin } from '../../admin';
import { AdminServiceService } from '../../admin-service.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css'],
})
export class RegisterAdminComponent implements OnInit {
  admin: Admin = new Admin();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: AdminService,
    private tokenStorage: TokenStorageService
  ) {}
  regForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', [Validators.minLength(3), Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone_number: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.pattern('^[6-9]{1}[0-9]{9}$'),
    ]),
    designation: new FormControl('', Validators.required),
  });
  ngOnInit(): void {}
  getErrorMessage() {
    console.log('entering');
    if (
      this.regForm.get('email')?.getError('required') ||
      this.regForm.get('id')?.getError('required')
    ) {
      return 'You must enter a value';
    }
    return '';
  }

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
    console.log(this.regForm.status);
    this.addAdmin();
  }
}
