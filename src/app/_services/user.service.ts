import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { User, iApiData } from '../_models/index';

import { GlobalService } from './global.service';
import { AuthService }   from './auth.service';
import { ApiService }    from './api.service';

import { Observable, Subject } from 'rxjs';


@Injectable()
export class UserService implements OnInit{
  public isLoggedIn  :boolean = false;
  public onLogin = new Subject<User | boolean> ();

  protected _currentUser :User | boolean; 

  public constructor(
    private http: Http,
    private apiService :ApiService,
    private authService :AuthService,
  ) { 
   
  }

  public async ngOnInit() {
    this.isLoggedIn   = this.authService.isLoggedIn();
    this._currentUser = await this.authService.getCurrentUser();
  }

  public get(id: number) {
    return this.apiService.get(`/user/${id}`);
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