import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginRequest } from 'src/models/login/request/login-request.model';
import { LoginService } from 'src/services/login/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService,
    private router: Router

  ) {
    //Inicializar form
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  async authentication() {

    if (this.loginForm.valid) {
      const loginRequest = new LoginRequest();
      loginRequest.username = this.loginForm.value.username;
      loginRequest.password = this.loginForm.value.password;

      await this.loginService.authentication(loginRequest).toPromise().then(loginResponse => {
        sessionStorage.setItem('token', loginResponse.data.payload.token);
        sessionStorage.setItem('refresh_token', loginResponse.data.payload.refresh_token);
        this.router.navigate(['home']);
      }).catch(err => {
        if (err.error.statusCode === 400) this.toastr.error(err.error.message);
        else this.toastr.error('Error, favor intente más tarde');
      });
    }
  }

}
