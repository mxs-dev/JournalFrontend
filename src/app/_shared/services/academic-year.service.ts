import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { IApiData, AcademicYear } from '../models';

import { Subject } from 'rxjs';


@Injectable()
export class AcademicYearService {

  public events = {
    created: new Subject<AcademicYear>(),
    updated: new Subject<AcademicYear>(),
    deleted: new Subject<AcademicYear>(),    
  };

  protected readonly apiPath = '';


  public constructor (
    private apiService: ApiService,
  ) {}


  public async get (id: number, extraFields: Array<string> = []): Promise<AcademicYear> {
    return this.apiService.get(this.apiPath + `/${id}${this.encodeExtraFields(extraFields)}`)
      .map( (response: IApiData) => {
        return new AcademicYear(response.data);
      })
      .toPromise();
  }


  public async getAll(extraFields: Array<string> = []): Promise<AcademicYear[]> {
    return this.apiService.get(this.apiPath + `${this.encodeExtraFields(extraFields)}`)
      .map((response: IApiData) => {
        const users = [];
        response.data.forEach(data => users.push(new AcademicYear(data)));

        return users;
      })
      .toPromise();
  }


  protected encodeExtraFields (extraFields: Array<string> = []): string {
    
    if (extraFields.length === 0) {
      return '';
    }
    
    let extraFieldsString = '?expand=';

    extraFields.forEach((item, i, arr) => {
      extraFieldsString += item;

      if (i < arr.length - 1) {
        extraFieldsString += ',';
      }

    });
    
    return extraFieldsString;
  }
}
