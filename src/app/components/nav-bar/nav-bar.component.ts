import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RefreshTokenRequest } from 'src/models/login/request/login-request.model';
import { UserResponse } from 'src/models/user/response/user-reponse.model';
import { LoginService } from 'src/services/login/login-service.service';
import { UserService } from 'src/services/user/user-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  userResponse: UserResponse;
  
  constructor(
    private userService: UserService,
    private router: Router,
    private loginService: LoginService
  ) {
    this.userResponse = new UserResponse();
  }

  ngOnInit(): void {
    this.loadInfoUser();
  }

  async loadInfoUser() {
    await this.userService.infoUser().toPromise().then(userResponse => {
      this.userResponse = userResponse;
    }).catch(err => {
      if (err.error.statusCode === 401) {
        this.refreshToken();
      }
    });
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  async refreshToken() {
    const data = sessionStorage.getItem('refresh_token');
    const refreshToken = data !== null ? data : '';

    const refreshTokenRequest = new RefreshTokenRequest();
    refreshTokenRequest.refresh_token = refreshToken;

    await this.loginService.refreshToken(refreshTokenRequest).toPromise().then(refreshTokenResponse => {
      sessionStorage.setItem('token', refreshTokenResponse.data.payload.token);
    })
  }
}
