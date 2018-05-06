import { Injectable } from '@angular/core';

import { BaseService } from './base.service';
import { ApiService } from './api.service';
import { IApiData, AcademicYear } from '../models';

import * as moment from 'moment';

@Injectable()
export class AcademicYearService extends BaseService<AcademicYear> {
  protected readonly modelClass = AcademicYear;
  protected readonly apiPath = '/academic-year';


  public async create (modelData: AcademicYear): Promise<AcademicYear> {
    return super.create({ AcademicYearRecord: {
      title: modelData.title,
      startDate: moment(modelData.startDate).format('YYYY-MM-DD'),
      endDate: moment(modelData.endDate).format('YYYY-MM-DD'),
    }});
  }

  public async update (model: AcademicYear, modelData: AcademicYear): Promise<AcademicYear> {
    return super.update(model, { AcademicYearRecord: modelData });
  } 
}
