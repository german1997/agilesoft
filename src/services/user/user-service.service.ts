import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserResponse } from 'src/models/user/response/user-reponse.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private serviceUrl: string = environment.microservice.userUrl;

  constructor(
    private http: HttpClient,
    ) { }

  infoUser() {
    return this.http.get<UserResponse>(this.serviceUrl + 'me');
  }
}
