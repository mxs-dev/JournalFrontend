import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { IApiData, Group } from '../_models';


@Injectable()
export class GroupService {
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
}
