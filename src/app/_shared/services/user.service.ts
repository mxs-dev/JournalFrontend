import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { User, IApiData } from '../models/index';

import { BaseService   } from './base.service';
import { GlobalService } from './global.service';
import { AuthService   } from './auth.service';
import { ApiService    } from './api.service';

import { Observable, Subject } from 'rxjs';



@Injectable()
export class UserService extends BaseService<User> {

  protected readonly modelClass = User;
  protected readonly apiPath = '/user';

  public isLoggedIn = false;
  public onLogin = new Subject<User|boolean> ();

  protected _currentUser: User | boolean;

  public constructor(
    protected apiService:  ApiService,
    protected authService: AuthService
  ) {
    super(null);

    this.isLoggedIn   = this.authService.isLoggedIn();
    this.authService.getCurrentUser()
      .then( (user: User) => {
        this._currentUser = user;
      })
      .catch( (err) => {
        console.log(err);
      });
  }
}
