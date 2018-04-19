import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { IApiData } from '../models/index';

import { AuthService } from './auth.service';
import { GlobalService } from './global.service';

import { Observable } from 'rxjs';


@Injectable()
export class ApiService {

  public constructor(
    public http: Http,
    public authService: AuthService,
    public globalService: GlobalService,
  ) { }

  public get(url: string): Observable<IApiData> {
    return this.http.get(
        this.globalService.apiHost + url,
        {
          headers: this.getHeaders()
        }
      )
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }


  public post(url: string, data: any): Observable<IApiData> {
    return this.http.post(
        this.globalService.apiHost + url,
        JSON.stringify(data),
        {
          headers: this.getHeaders()
        }
      )
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }


  public patch(url: string, data: any): Observable<IApiData> {
    return this.http.patch(
      this.globalService.apiHost + url,
      JSON.stringify(data),
      {
        headers: this.getHeaders()
      }
    )
    .map((response: Response) => response.json())
    .catch(this.handleError);
  }


  public delete (url: string): Observable<boolean> {
    return this.http.delete(
      this.globalService.apiHost + url,
      {
        headers: this.getHeaders()
      }
    )
    .map((response: Response) => {
      if (response.status === 204) {
        return true;
      }

      return false;
    })
    .catch(this.handleError);
  }


  protected getHeaders() {
    return new Headers({
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${this.authService.getAccessToken()}`
    });
  }

  
  protected handleError(error: Response | any) {
    let errorMessage: any = {};
    console.log(`ApiService got error:`, error);

    // Connection error
    if (Number(error.status) === 0) {
      errorMessage = {
        success: false,
        status: 0,
        data: 'Sorry, there was a connection error occurred. Please try again.',
      };
    } else {
      errorMessage = error.json();
    }

    return Observable.throw(errorMessage);
  }
}
