import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginRequest, RefreshTokenRequest } from 'src/models/login/request/login-request.model';
import { LoginResponse } from 'src/models/login/response/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private serviceUrl: string = environment.microservice.loginUrl;

  constructor(
    private http: HttpClient,
  ) { }

  authentication(loginRequest: LoginRequest) {
    return this.http.post<LoginResponse>(this.serviceUrl + 'login', loginRequest);
  }

  refreshToken(refreshTokenRequest: RefreshTokenRequest) {
    return this.http.post<LoginResponse>(this.serviceUrl + 'refresh', refreshTokenRequest);
  }

  isLogged() {
    const token = sessionStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}
