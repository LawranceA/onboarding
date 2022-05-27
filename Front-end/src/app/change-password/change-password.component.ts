import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidationService } from '../user/services/custom-validation.service';
import { UserDataService } from '../user/services/user-data.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  
})
export class ChangePasswordComponent implements OnInit {

  hide = true;

  display = 'none';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userData: UserDataService,
    public validation: CustomValidationService
  ) {}

  changeForm = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email, this.validation.emailValidator]),
    password: new FormControl('', [Validators.required,Validators.pattern("^([a-zA-Z0-9@*#^&%!]{8,15})$")]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  checkPassword(e: Event) {
    let pass = (<HTMLInputElement>e.target).value;
    if (this.changeForm.value.password != pass) {
      this.display = 'block';
    } else {
      this.display = 'none';
    }
  }

  ngOnInit(): void {}

  onChangePassword(e: Event) {
    console.log(this.changeForm);
    e.preventDefault();
    this.changeForm.value.status = 'yes';
    this.userData.changePassword(this.changeForm.value).subscribe((data) => {

      if (data.message == 'Password Updated successfully') {
        console.log('Inside subscribe');
        localStorage.setItem('passChange','yes')
        this.router.navigate(['/login'], { relativeTo: this.route });
      } else {
        this.router.navigate(['../ChangePassword'], { relativeTo: this.route });
      }
    });
  }
}
