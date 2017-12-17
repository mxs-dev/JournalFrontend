import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';

import { Observable } from 'rxjs/Observable';

import { GlobalService } from './global.service';


@Injectable()
export class UserService {

   private jwtHelper = new JwtHelper();

   public redirectUrl: string;

   public constructor(
      private http: Http,
      private globalService: GlobalService,
   ) { }

   public login(username: string, password: string) {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json; charset=UTF-8');

      return this.http
         .post(
         this.globalService.apiHost + '/user/login',
         JSON.stringify({
            LoginForm: {
               username: username,
               password: password
            }
         }),
         { headers: headers }
         )
         .map((response: Response) => response.json())
         .catch(this.handleError);
   }

   public logout() {

   }

   public isLoggedIn() {
      // TODO: !!!
      return false;
   }

   private handleError(error: Response | any) {
      let errorMessage: any;

      if (error.status == 0) {
         errorMessage = {
            success: false,
            status: 0,
            data: "Sorry, there was a connection error occured. Please try later",
         };
      } else {
         errorMessage = error.json();
      }

      return Observable.throw(errorMessage);
   }
}