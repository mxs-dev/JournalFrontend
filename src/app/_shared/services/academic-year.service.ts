import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { IApiData, AcademicYear } from '../models';

import { Subject } from 'rxjs';
import { BaseService } from './base.service';


@Injectable()
export class AcademicYearService extends BaseService<AcademicYear> {
  protected readonly modelClass = AcademicYear;
  protected readonly apiPath = '/academic-year';

  public async create (modelData: AcademicYear): Promise<AcademicYear> {
    return super.create({
      AcademicYearRecord: modelData
    });
  }

  public async update (id: number, modelData: AcademicYear): Promise<AcademicYear> {
    return super.update(id, {
      AcademicYearRecord: modelData
    });
  } 
}
