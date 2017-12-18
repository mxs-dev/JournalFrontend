import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

import { Observable } from 'rxjs';

import { GlobalService } from './global.service';

@Injectable()
export class AuthService {

   public static readonly ACCESS_TOKEN_LS_KEY = `Journal.accessToken`;
   
   private jwtHelper = new JwtHelper();
   private loggedIn  = false;

   public redirectUrl: string;

   public constructor(
      private http: Http,
      private globalService: GlobalService,
   ) { 

      this.loggedIn = this.isLoggedIn();
   }

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
         .map((response :any) => {
            if (response.success) {
               this.setAuthToken(response.data.accessToken);
               this.loggedIn = true;
            
            } else {
               this.removeAuthToken();
               this.loggedIn = false;
            }

            return response;
         })
         .catch(this.handleError);
   }

   public logout() {
      this.removeAuthToken();
      this.loggedIn = false;
   }

   public isLoggedIn() :boolean{
      return tokenNotExpired(null, this.getAuthToken());
   }

   public decode () {
      let token = this.getAuthToken();
      console.log(token);

      return this.jwtHelper.decodeToken(token);
   }


   protected getAuthToken ( ) :string{
      return localStorage.getItem(AuthService.ACCESS_TOKEN_LS_KEY);
   }

   protected setAuthToken (token :string) {
      localStorage.setItem(AuthService.ACCESS_TOKEN_LS_KEY, token);
   }

   protected removeAuthToken () {
      localStorage.removeItem(AuthService.ACCESS_TOKEN_LS_KEY);
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