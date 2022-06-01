import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TokenStorageService } from '../services/token-storage.service';
import { CustomValidationService } from '../user/services/custom-validation.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
 
  
})
export class LoginPageComponent implements OnInit {

  hide = true;

  public selectedVal!: string;
  status = 'success';
  user = '';
  setUser(data: any) {
    this.user = data;
  }

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role: any = '';

  data: any;
  logForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, this.validation.emailValidator]),
    password: new FormControl('',[Validators.required,Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{8,15}')]),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthServiceService,
    private tokenStorage: TokenStorageService,
    public validation: CustomValidationService
  ) {}

  ngOnInit(): void {
    this.selectedVal = 'user';
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUser().role;
    }
    // this.tokenStorage.signOut();
    if (this.isLoggedIn && this.tokenStorage.getUser() == 'admin') {
      this.router.navigate([`../${this.tokenStorage.getUser()}`]);
    } else if (
      this.tokenStorage.getUser() == 'user' &&
      localStorage.getItem('passChange') == 'yes'
    ) {
      localStorage.setItem('passChange', 'no');
    } else if (this.tokenStorage.getUser() == 'user') {
      this.router.navigate([`../${this.tokenStorage.getUser()}`]);
    }
  }
  public onValChange(val: string) {
    this.selectedVal = val;
  }
  onLogin(e: Event) {
    console.log(this.logForm)
    console.log(this.selectedVal);
    e.preventDefault();

    this.data = this.logForm.value;

    this.authService
      .login(this.data.email, this.data.password, this.selectedVal)
      .subscribe(
        (data) => {
          console.log(data)
          this.tokenStorage.setDesignation(data.designation)
          this.tokenStorage.saveToken(data.accessToken);
          console.log(data);
          this.tokenStorage.saveUser(data.role);
          this.tokenStorage.saveName(data.name);
          this.tokenStorage.userID(data.id);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          console.log(this.tokenStorage.getUser());
          // this.role = this.tokenStorage.getUser();
          if (this.tokenStorage.getUser() == 'admin') {
            this.router.navigate([`../${this.tokenStorage.getUser()}`], {
              relativeTo: this.route,
            });
          } else if (
            data.message == 'invalid password' ||
            data.message == 'user not found'
          ) {
          } else if (
            this.tokenStorage.getUser() == 'user' &&
            data.pass == 'yes'
          ) {
            this.router.navigate([`../${this.tokenStorage.getUser()}`], {
              relativeTo: this.route,
            });
          } else if (
            this.tokenStorage.getUser() == 'user' &&
            data.pass == null
          ) {
            console.log(data.pass);
            this.router.navigate(['../ChangePassword'], {
              relativeTo: this.route,
            });
          }
          // else if (data.password_status == null) {
          //   console.log(data);
          //   this.router.navigate(['../ChangePassword'], {
          //     relativeTo: this.route,
          //   });
          // } else {
          //   this.router.navigate([`../${this.tokenStorage.getUser()}`], {
          //     relativeTo: this.route,
          //   });
          // }
        },
        (err) => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
  }
  ChangePasswordPage() {
    this.router.navigate(['../ChangePassword']);
  }
}
