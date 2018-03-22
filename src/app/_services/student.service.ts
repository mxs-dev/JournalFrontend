import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { IApiData, User, ApiError } from '../_models';

import { Subject } from 'rxjs';


@Injectable() 
export class StudentService {

  public events = {
    created: new Subject<User>(),
    deleted: new Subject<number>(),
  };

  protected apiPath = '/student';


  public constructor (
    private apiService: ApiService,
  ) { }


  public async get (id: number): Promise<User> {
    return this.apiService.get(this.apiPath + `/${id}`)
      .map( (response: IApiData) => {
        return <User> response.data;
      })
      .toPromise();
  }


  public async getAll(): Promise<User[]> {
    return this.apiService.get(this.apiPath)
      .map((response: IApiData) => {
        const users = [];
        response.data.forEach( data => {
          users.push(new User(data));
        });

        return users;
      })
      .toPromise();
  }


  public async create() {
    return this.apiService.post(this.apiPath, {
      // TODO: Модель
    })
      .map((response: IApiData) => {
        if (response.success) {
          const u = new User(response.data);
          this.events.created.next(u);
          return u;
        }

        throw new ApiError(response.status, response.data);
      })
      .toPromise();
  } 


  public async delete(id: number): Promise<boolean> {
    return this.apiService.delete(this.apiPath + `/${id}`)
      .map((result: boolean) => {

        if (result) {
          this.events.deleted.next(id);
        }

        return result;
      })
      .toPromise();
  }

} 
