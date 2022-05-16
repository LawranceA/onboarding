import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css'],
})
export class RegisterEmployeeComponent implements OnInit {
  constructor(
    private tokenStorage: TokenStorageService,
    private service: AdminService,
    private router: Router,
    private route: ActivatedRoute
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

  user: any;
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

  addUser() {
    this.service.addEmployee(this.user).subscribe((data) => {
      console.log(data.message);
      this.service.setStatus({ status: data.message, user: 'Employee' });
    });
    this.router.navigate(['../registerStatus'], { relativeTo: this.route });
  }
  register(e: Event) {
    e.preventDefault();
    this.user = this.regForm.value;
    this.user.created_at = new Date();
    this.user.created_by = this.tokenStorage.getName();
    this.user.updated_at = new Date();
    this.user.updated_by = this.tokenStorage.getName();
    this.addUser();
  }
}
