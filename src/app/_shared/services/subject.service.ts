import { Injectable } from '@angular/core';

import { BaseService } from './base.service';
import { ApiService } from './api.service';
import { IApiData, Subject } from '../models';


@Injectable()
export class SubjectService extends BaseService<Subject> {

  protected readonly modelClass = Subject;
  protected readonly apiPath = '/subject';
  

  public async create (modelData: Subject): Promise<Subject> {
    return super.create({'SubjectRecord': modelData});
  }


  public async update (model: Subject, modelData: Subject): Promise<Subject> {
    return super.update(model, {'SubjectRecord': modelData});
  }


  public async search (modelData: Subject): Promise<Subject[]> {
    return super.search({'SubjectSearch': modelData});
  }
}
