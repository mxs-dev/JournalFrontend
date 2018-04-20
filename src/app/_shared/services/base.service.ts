import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { IApiData, ApiError } from '../models';

import { Subject } from 'rxjs';
import { BaseModel } from '../models/base.model';


@Injectable()
export abstract class BaseService <T extends BaseModel> {

  public events = new ServiceEvents<T>();

  protected abstract readonly modelClass: (new (...params) => T);
  protected abstract readonly apiPath: string;
  protected readonly extraFieldUrlParam = 'expand';

  public constructor (
    private apiService: ApiService,
  ) {}


  public async get(id: number, extraFields: string[] = []): Promise<T> {
    return this.apiService.get(this.apiPath + `/${id}${this.encodeExtraFields(extraFields)}`)
      .map((response: IApiData) => {
        return new this.modelClass(response.data);
      })
      .toPromise();
  }


  public async getAll (extraFields: string[] = []): Promise<T[]> {
    return this.apiService.get(this.apiPath + `${this.encodeExtraFields(extraFields)}`)
      .map((response: IApiData) => {
        const models = [];
        response.data.forEach(data => models.push(new this.modelClass(data)));
        return models;
      })
      .toPromise();
  }


  public async delete (model: T): Promise<boolean> {
    return this.apiService.delete(this.apiPath + `/${model.id}`)
      .map((result: boolean) => {
        if (result) {
          this.events.deleted.next(model);
        }
        return result;
      })
      .toPromise();
  }


  public async create (modelData: any): Promise<T> {
    return this.apiService.post(this.apiPath, modelData)
      .map((response: IApiData) => {
        if (response.success) {
          const model = new this.modelClass(response.data);
          this.events.created.next(model);
          return model;
        }

        throw new ApiError(response.status, response.data);
      })
      .toPromise();
  }


  public async update (id: number, modelData: any): Promise<T> {
    return this.apiService.patch(this.apiPath, modelData)
      .map((response: IApiData) => {
        if (response.success) {
          const model = new this.modelClass(modelData);
          this.events.updated.next(model);
          return model;
        }
      })
      .toPromise();
  }
  

  protected encodeExtraFields (extraFields: Array<string> = []): string {
    if (extraFields.length === 0) {
      return '';
    }
    
    return `?${this.extraFieldUrlParam}=${extraFields.join(',')}`;
  }
}


class ServiceEvents<T> {
  created = new Subject<T>();
  updated = new Subject<T>();
  deleted = new Subject<T>();
}
