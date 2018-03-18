import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { IApiData, Group } from '../_models';


@Injectable()
export class GroupService {

  // Хранить ли весь список ???
  protected groups: Group[];

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


  public async create(title): Promise<IApiData> {
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
          // Если хранить, то кешировать
        }

        return data;
      })
      .toPromise();
  }
}
