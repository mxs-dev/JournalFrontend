import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { IApiData, Group, User } from '../_models';

import { Subject } from 'rxjs';


@Injectable()
export class GroupService {

  public events = {
    created: new Subject<Group>(),
    deleted: new Subject<number>()
  };

  protected apiPath = '/group';


  public constructor (
    private apiService: ApiService
  ) {}


  public async get (id: number): Promise<Group> {
    return this.apiService.get(this.apiPath + `/${id}`)
      .map( (response: IApiData) => {
        return <Group> response.data;
      })
      .toPromise();
  }


  public async getAll (): Promise<Group[]> {
    return this.apiService.get(this.apiPath)
      .map((response: IApiData) => {
        return <Group[]> response.data;
      })
      .toPromise();
  }


  public async create(title: string): Promise<Group> {
    return this.apiService.post(
        this.apiPath,
        {
          GroupRecord: {
            title, 
            course: '1' // TODO: Разобраться с курсами
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


  public async update(id: number, group: Group): Promise<Group> {
    return this.apiService.patch(
      this.apiPath + `/${id}`,
      {
        GroupRecord: group
      }
    )
    .map((response: IApiData) => {
      console.log(response);

      return new Group({});
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


  public async getStudents(id: number): Promise<User[]> {
    return this.apiService.get(`${this.apiPath}/${id}/students`)
      .map((response: IApiData) => {
        return <User[]>response.data;
      })
      .toPromise();
  }
}
