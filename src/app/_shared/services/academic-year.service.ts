import { Injectable } from '@angular/core';

import { BaseService } from './base.service';
import { ApiService } from './api.service';
import { IApiData, AcademicYear } from '../models';


@Injectable()
export class AcademicYearService extends BaseService<AcademicYear> {
  protected readonly modelClass = AcademicYear;
  protected readonly apiPath = '/academic-year';


  public async create (modelData: AcademicYear): Promise<AcademicYear> {
    return super.create({ AcademicYearRecord: modelData });
  }

  public async update (model: AcademicYear, modelData: AcademicYear): Promise<AcademicYear> {
    return super.update(model, { AcademicYearRecord: modelData });
  } 
}
