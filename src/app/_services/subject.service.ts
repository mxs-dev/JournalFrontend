import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { IApiData, Subject } from '../_models';

import { Subject as rxSubject } from 'rxjs';

@Injectable()
export class SubjectService {

  public events = {
    created: new rxSubject<Subject>(),
    updated: new rxSubject<Subject>(),
    deleted: new rxSubject<Subject>(),
  };

  protected readonly apiPath = '/subject';


  public constructor (
    private apiService: ApiService
  ) { }

  
  public async getAll (): Promise<Subject[]> {
    return this.apiService.get(this.apiPath)
      .map((response: IApiData) => {
        const subjects = new Array<Subject>();
        response.data.forEach((item) => {
          subjects.push(item);
        }); 
        return subjects;
      })
      .toPromise();
  }


  public async getById (id: number): Promise<Subject> {
    return this.apiService.get(this.apiPath + `/${id}`)
      .map((response: IApiData) => {
        return new Subject(response.data);
      })
      .toPromise();
  }


  public async create (data: Subject): Promise<Subject> {
    return this.apiService.post(this.apiPath, {
      SubjectRecord: data
    })
    .map((response: IApiData) => {
      const subject = new Subject(response.data); 
      this.events.created.next(subject);
      return subject;
    })
    .toPromise();
  }


  public async update (id: number, data: Subject): Promise<Subject> {
    return this.apiService.patch(this.apiPath + `/${id}`, {
      SubjectRecord: data
    })
    .map((response: IApiData) => {
      const subject = new Subject(response.data);
      this.events.updated.next(subject);
      return subject;
    })
    .toPromise();
  }


  public async delete (id: number): Promise<void> {
    this.apiService.delete(this.apiPath + `/${id}`).toPromise();
  }
}
