import { Injectable } from '@angular/core';

import { BaseService } from './base.service';
import { ApiService } from './api.service';
import { IApiData, Teacher, Subject } from '../models';


@Injectable()
export class TeacherService extends BaseService<Teacher> {
  protected readonly modelClass = Teacher;
  protected readonly apiPath = '/teacher';


  public async create (modelData: Teacher): Promise<Teacher> {
    return super.create({'Teacher': modelData});
  }


  public async update (model: Teacher, modelData: Teacher): Promise<Teacher> {
    return super.update(model, {'Teacher': modelData});
  }


  public async search (modelData: Teacher): Promise<Teacher[]> {
    return super.search({ TeacherSearch: modelData });
  }


  public async addAssignedSubject(teacher: Teacher, subject: Subject): Promise<boolean> {
    return this.apiService
      .get(this.apiPath + `/${teacher.id}/assign-subject/${subject.id}`)
      .map((response: IApiData) => response.success)
      .toPromise();
  }


  public async removeAssignedSubject(teacher: Teacher, subject: Subject): Promise<boolean> {
    return this.apiService
      .delete(this.apiPath + `/${teacher.id}/unassign-subject/${subject.id}`)
      .toPromise();
  }
}
