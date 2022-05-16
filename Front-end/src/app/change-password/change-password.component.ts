import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from '../user/services/user-data.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ChangePasswordComponent implements OnInit {
  display = 'none';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userData: UserDataService
  ) {}

  changeForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
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
