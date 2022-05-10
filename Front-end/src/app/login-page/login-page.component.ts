import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
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
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthServiceService,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUser().role;
    }
    // this.tokenStorage.signOut();
    if (this.isLoggedIn) {
      this.router.navigate([`../${this.tokenStorage.getUser()}`]);
    }
  }

  onLogin(e: Event) {
    e.preventDefault();

    this.data = this.logForm.value;

    this.authService
      .login(this.data.email, this.data.password, this.user)
      .subscribe(
        (data) => {
          this.tokenStorage.saveToken(data.accessToken);
          console.log(data)
          this.tokenStorage.saveUser(data.role);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          console.log(this.tokenStorage.getUser())
          // this.role = this.tokenStorage.getUser();
          this.router.navigate([`/${this.tokenStorage.getUser()}`], {
            relativeTo: this.route,
          });
          
        },
        (err) => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
  }
}
