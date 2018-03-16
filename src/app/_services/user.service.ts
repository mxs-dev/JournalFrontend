import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { User, IApiData } from '../_models/index';
import { UserFactory } from '../_factories/index';

import { GlobalService } from './global.service';
import { AuthService   } from './auth.service';
import { ApiService    } from './api.service';

import { Observable, Subject } from 'rxjs';



@Injectable()
export class UserService {
  public isLoggedIn = false;
  public onLogin = new Subject<User | boolean> ();

  protected _currentUser: User | boolean;

  public constructor(
    private http: Http,
    private apiService:  ApiService,
    private authService: AuthService,
    private userFactory: UserFactory
  ) {
    this.isLoggedIn   = this.authService.isLoggedIn();
    this.authService.getCurrentUser()
      .then( (user: User) => {
        this._currentUser = user;
      })
      .catch( (err) => {
        console.log(err);
      });
  }


  public async get(id: number) {
    const data = await this.apiService.get(`/user/${id}`);

    return this.userFactory.getUserFromData(data);
  }
}
