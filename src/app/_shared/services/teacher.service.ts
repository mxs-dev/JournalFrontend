import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { IApiData, Teacher, Subject, ApiError } from '../models';

import { Subject as rxSubject } from 'rxjs';


@Injectable() 
export class TeacherService {
  
  public events = {
    created: new rxSubject<Teacher>(),
    updated: new rxSubject<Teacher>(),
    deleted: new rxSubject<Teacher>(),
  };

  protected  readonly apiPath = '/teacher';


  public constructor (
    private apiService: ApiService,
  ) { }


  public async get (id: number, extraFields: Array<string> = []): Promise<Teacher> {
    return this.apiService.get(this.apiPath + `/${id}${this.encodeExtraFields(extraFields)}`)
      .map( (response: IApiData) => {
        return new Teacher(response.data);
      })
      .toPromise();
  }


  public async getAll(extraFields: Array<string> = []): Promise<Teacher[]> {
    return this.apiService.get(this.apiPath + `${this.encodeExtraFields(extraFields)}`)
      .map((response: IApiData) => {
        const users = [];
        response.data.forEach(data => users.push(new Teacher(data)));

        return users;
      })
      .toPromise();
  }


  public async search (teacher: Teacher): Promise<Teacher[]> {
    return this.apiService.post(this.apiPath + '/search', {
      TeacherSearch: Teacher
    })
    .map((response: IApiData) => {
      const teachers = [];
      response.data.forEach(data => teachers.push(new Teacher(data)));

      return teachers;
    })
    .toPromise();
  }


  public async create(teacherData: Teacher): Promise<Teacher> {
    return this.apiService.post(this.apiPath, {
       Teacher: {
         ...teacherData,
         role: Teacher.ROLE_TEACHER
       }
    })
    .map((response: IApiData) => {
      if (response.success) {
        const teacher = new Teacher(response.data);
        this.events.created.next(teacher);
        return teacher;
      }

      throw new ApiError(response.status, response.data);
    })
    .toPromise();
  } 


  public async update(id: number, teacherData: Teacher): Promise<Teacher> {
    return this.apiService.patch(this.apiPath, {
      ...teacherData
    })
    .map((response: IApiData) => {
      if (response.success) {
        const teacher = new Teacher(teacherData);
        this.events.updated.next(teacher);
        return teacher;
      }
    })
    .toPromise();
  }


  public async delete(teacher: Teacher): Promise<boolean> {
    return this.apiService.delete(this.apiPath + `/${teacher.id}`)
      .map((result: boolean) => {

        if (result) {
          this.events.deleted.next(teacher);
        }

        return result;
      })
      .toPromise();
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
