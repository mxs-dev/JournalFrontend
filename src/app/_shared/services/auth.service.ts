import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { JwtHelper, tokenNotExpired, AUTH_PROVIDERS } from 'angular2-jwt';

import { IApiData, iJWT, User } from '../models/index';
import { GlobalService } from './global.service';

import { Observable, Subject } from 'rxjs';


@Injectable()
export class AuthService {
  protected readonly ACCESS_TOKEN_LS_KEY = `Journal.accessToken`;

  protected jwtHelper   = new JwtHelper();

  protected _isLogginedIn: boolean;
  protected _isLoadingCurrentUser = false;
  protected _currentUser: User;


  public redirectUrl: string;

  public onAuthChange = new Subject<User|null>();


  public constructor(private http: Http, private globalService: GlobalService) {
    this._isLogginedIn = this.isValidToken();

    if (this._isLogginedIn) {
      this._currentUser = this.getCurrentUserFromJWT();
    }
  }


  public isLoggedIn(): boolean {
    return this._isLogginedIn;
  }


  public getCurrentUser(): User {
    if (!this._isLogginedIn) {
      return null;
    }

    return this._currentUser;
  }


  protected getCurrentUserFromJWT (): User {
    return new User(this.getJWT().model);
  }


  public login(email: string, password: string): Promise<any> {
    return this.http
      .post(
      this.globalService.apiHost + '/user/login',
      JSON.stringify({
        LoginForm: {
          email,
          password
        }
      }),
      {headers: this.getHeaders()})
      .map((response: Response) => response.json())
      .map((response: IApiData) => {
        if (response.success) {
          this.setAccessToken(response.data.accessToken);
          this._isLogginedIn = true;

        } else {
          this.removeAccessToken();
          this._isLogginedIn = false;
          this.resetCurrentUser();
        }

        return response;
      })
      .catch(this.handleError)
      .toPromise();
  }


  public logout() {
    this.removeAccessToken();
    this._isLogginedIn = false;

    this.onAuthChange.next();

    this.resetCurrentUser();
  }


  public confirmRegistration() {
  }


  public isValidToken(): boolean {
    return tokenNotExpired(null, this.getAccessToken());
  }


  public getJWT(): iJWT {
    const token = this.getAccessToken();

    if (token) {
      return this.jwtHelper.decodeToken(token);
    }

    return null;
  }


  public getAccessToken(): string {
    return localStorage.getItem(this.ACCESS_TOKEN_LS_KEY);
  }


  protected async loadCurrentUser(): Promise<void> {
    if (this._isLoadingCurrentUser) {
      return;
    }

    this._isLoadingCurrentUser = true;
    const user = await this.http
      .get(
        this.globalService.apiHost + `/user/${this.getJWT().jti}`,
        { headers: this.getHeaders() }
      )
      .map((response: Response) => response.json())
      .map((response: IApiData) => new User(response.data))
      .toPromise();

    this._currentUser = user;
    this.onAuthChange.next(this._currentUser);

    this._isLoadingCurrentUser = false;
  }


  protected resetCurrentUser() {
    this._currentUser = null;
  }


  protected setAccessToken(token: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_LS_KEY, token);
  }


  protected removeAccessToken(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_LS_KEY);
  }


  protected getHeaders(): Headers {
    return new Headers({
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': `Bearer ${this.getAccessToken()}`
    });
  }


  protected handleError(error: Response | any) {
    let errorMessage: any;

    if (Number(error.status) === 0) {
      errorMessage = {
        success: false,
        status: 0,
        data: 'Sorry, there was a connection error occured. Please try later',
      };
    } else {
      errorMessage = error.json();
    }

    return Observable.throw(errorMessage);
  }
}
