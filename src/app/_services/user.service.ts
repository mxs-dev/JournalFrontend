import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Http, Headers } from '@angular/http';

import { JwtHelper } from 'angular2-jwt';
import { GlobalService } from './global.service';


@Injectable()
export class UserService {
  
  private jwtHelper = new JwtHelper();

  public constructor(
    private http :Http,
    private globalService :GlobalService,
  ) {}

  public login() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=UTF-8');

    this.http
      .post(
          this.globalService.apiHost + '/user/login',
          JSON.stringify({
            "LoginForm" : {
            "username" : "admin",
            "password" : "admin"
          }}),
          {headers: headers}
      )
      .map( (response) => response.json())
      .subscribe(
        res => {
          console.log(res);
          console.log(this.jwtHelper.decodeToken(res.accessToken));
        },
        err => {
          console.log(err);
        }
      )
  }

  public logout () {
    
  }

}