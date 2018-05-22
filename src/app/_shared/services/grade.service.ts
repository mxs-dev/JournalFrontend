import { Injectable } from '@angular/core';

import { BaseService } from './base.service';
import { ApiService } from './api.service';
import { IApiData, Grade, User, ApiError } from '../models';


@Injectable()
export class GradeService extends BaseService<Grade> {

  protected readonly modelClass = Grade;
  protected readonly apiPath = '/grade';


  public async create(modelData: Grade): Promise<Grade> {
    return super.create({GradeRecord: modelData});
  }


  public async update(model: Grade, modelData: Grade): Promise<Grade> {
    return super.update(model, {GradeRecord: modelData});
  }
}
