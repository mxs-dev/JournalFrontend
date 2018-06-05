import { Injectable } from '@angular/core';

import { BaseService } from './base.service';
import { Teaches, IApiData } from '../models';


@Injectable()
export class TeachesService extends BaseService<Teaches> {
  protected readonly modelClass = Teaches;
  protected readonly apiPath = '/teaches';

  public async calculateTotalGrades (id: number): Promise<boolean> {
    return this.apiService.get(`${this.apiPath}/${id}/calculate-total-grades`)
      .map((response: IApiData) => {
        return response.success;
      })
      .toPromise();
  }
}
