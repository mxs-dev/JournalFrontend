import { Injectable } from '@angular/core';

import { BaseService } from './base.service';
import { ApiService } from './api.service';
import { IApiData, Semester } from '../models';

import * as moment from 'moment';


@Injectable()
export class SemesterService extends BaseService<Semester> {
  protected readonly modelClass = Semester;
  protected readonly apiPath = '/semester';

  
  public async create (modelData: Semester): Promise<Semester> {
    return super.create({ SemesterRecord: {
      ...modelData,
      startDate: moment(modelData.startDate).format('YYYY-MM-DD'),
      endDate: moment(modelData.endDate).format('YYYY-MM-DD'),
    }});
  }

  public async update (model: Semester, modelData: Semester): Promise<Semester> {
    return super.update(model, { SemesterRecord: modelData });
  } 
}
