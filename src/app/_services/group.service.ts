import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { IApiData, Group, User } from '../_models';
import { Subject } from 'rxjs';


@Injectable()
export class GroupService {

  public events = {
    created: new Subject<Group>(),
    deleted: new Subject<Group>()
  };


  public constructor (
    private apiService: ApiService
  ) {}


  public async getAll (): Promise<Group[]> {
    return this.apiService.get(`/group`)
    .map((response: IApiData) => {
      return <Group[]> response.data;
    })
    .toPromise();
  }


  public async get (id: number): Promise<Group> {
    return this.apiService.get(
      `/group/${id}`
    )
    .map( (response: IApiData) => {
      return <Group> response.data;
    })
    .toPromise();
  }


  public async create(title: string): Promise<Group> {
    return this.apiService.post(
        `/group`,
        {
          GroupRecord: {
            title, 
            course: '1'
          }
        }
      )
      .map(data => {
        if (data.success) {
          const g = new Group(data.data);
          this.events.created.next(g);
          return g;
        }

        throw new Error('Error: ' + data.status);
      })
      .toPromise();
  }


  public async delete(id: number): Promise<boolean> {
    return this.apiService
      .delete(`/group/${id}`)
      .toPromise();
  } 


  public async getStudents(id: number): Promise<User[]> {
    return this.apiService.get(`/group/${id}/students`)
      .map((response: IApiData) => {
        return <User[]>response.data;
      })
      .toPromise();
  }
}
