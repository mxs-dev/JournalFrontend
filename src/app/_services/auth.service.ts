import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

import { IApiData, iJWT, User } from '../_models/index';
import { GlobalService } from './global.service';

import { Observable, Subject } from 'rxjs';


@Injectable()
export class AuthService implements OnDestroy {

  public static readonly ACCESS_TOKEN_LS_KEY = `Journal.accessToken`;

  protected jwtHelper = new JwtHelper();
  protected _logginedIn = false;
  protected _currentUser: User | boolean;
  protected _isLoadingCurrentUser = false;

  public redirectUrl: string;
  public onLogin = new Subject<User | boolean>();


  public constructor(private http: Http, private globalService: GlobalService) {

    this._logginedIn = this.isValidToken();

    if (this._logginedIn) {
      this.loadCurrentUser();
    } else {
      this.resetCurrentUser();
    }
  }

  public isLoggedIn(): boolean {
    return this._logginedIn;
  }

  public async getCurrentUser(): Promise<User | any> {
    if (!this._logginedIn) {
      return Promise.resolve(null);
    }

    if (!this._currentUser) {
      await this.loadCurrentUser();
    }

    return Promise.resolve(this._currentUser);
  }


  public login(email: string, password: string): Observable<any> {
    return this.http
      .post(
      this.globalService.apiHost + '/user/login',
      JSON.stringify({
        LoginForm: {
          email,
          password
        }
      }),
      { headers: this.getHeaders() }
      )
      .map((response: Response) => response.json())
      .map((response: IApiData) => {
        if (response.success) {
          this.setAccessToken(response.data.accessToken);
          this._logginedIn = true;

          this.loadCurrentUser();

        } else {
          this.removeAccessToken();
          this._logginedIn = false;
          this.resetCurrentUser();
        }

        return response;
      })
      .catch(this.handleError);
  }


  public logout() {
    this.removeAccessToken();
    this._logginedIn = false;

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
    return localStorage.getItem(AuthService.ACCESS_TOKEN_LS_KEY);
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

    console.log(`loadCurrentUser`, user);

    this._currentUser = user;
    this.onLogin.next(this._currentUser);

    this._isLoadingCurrentUser = false;
  }

  protected resetCurrentUser() {
    this._currentUser = false;

    this.onLogin.next(false);
  }

  protected setAccessToken(token: string): void {
    localStorage.setItem(AuthService.ACCESS_TOKEN_LS_KEY, token);
  }

  protected removeAccessToken(): void {
    localStorage.removeItem(AuthService.ACCESS_TOKEN_LS_KEY);
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

  public ngOnDestroy() {
    this.onLogin.unsubscribe();
  }
}
