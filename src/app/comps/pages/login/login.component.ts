import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AccessService } from '../../../services/access.service';
import { ApiResponse, AppUserData } from '../../../model/access.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SsoService } from '../../../sso/sso.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextModule, ButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [ AccessService, SsoService ]
})
export class LoginComponent implements OnInit {
  constructor(private as: AccessService,
    private readonly keyService: SsoService, private router: Router) {
    this.loginForm.valueChanges.subscribe({
      next: (res: any) => {
        this.resetMessage();
      }
    })
  }
  loginForm = new FormGroup({
    loginid: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  errormsg: string | undefined;
  loginSuccess: boolean = false;

  ngOnInit(): void {
      if (this.keyService.isLoggedIn()) {
        this.router.navigate(['home', 'nestle']);
      }
  }
  login() {
    this.errormsg = undefined;
    if (this.loginForm.valid) {
      let loginid = this.loginForm.get('loginid')?.value;
      let password = this.loginForm.get('password')?.value;
      this.as.login(loginid || '', password || '')
      .subscribe({
        next: (res: any) => {
          this.handleLoginResponse(res as ApiResponse<AppUserData>);
        },
        error: (err: any) => {
          console.log(err);
          this.handleLoginError(err);
        }
      });
    }
  }

  handleLoginResponse(res: ApiResponse<AppUserData>) {
    console.log(res);
    if (res.data.accesstoken != null && 
      res.data.roles != null && 
      res.data.roles.length > 0) {
        this.loginSuccess = true;
    }
  }

  handleLoginError(err: HttpErrorResponse) {
    console.log(err);
    this.errormsg = "Invalid username or password";
    this.loginSuccess = false;
  }

  resetMessage() {
    this.errormsg = undefined;
    this.loginSuccess = false;
  }
}
