import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { IApiData, Student, ApiError } from '../models';

import { Subject } from 'rxjs';


@Injectable() 
export class StudentService {
  
  public events = {
    created: new Subject<Student>(),
    updated: new Subject<Student>(),
    deleted: new Subject<number>(),
  };

  protected  readonly apiPath = '/student';


  public constructor (
    private apiService: ApiService,
  ) { }


  public async get (id: number, extraFields: Array<string> = []): Promise<Student> {
    return this.apiService.get(this.apiPath + `/${id} ${this.encodeExtraFields(extraFields)}`)
      .map( (response: IApiData) => {
        return new Student(response.data);
      })
      .toPromise();
  }


  public async getAll(extraFields: Array<string> = []): Promise<Student[]> {
    return this.apiService.get(this.apiPath + `${this.encodeExtraFields(extraFields)}`)
      .map((response: IApiData) => {
        const users = [];
        response.data.forEach(data => users.push(new Student(data)));

        return users;
      })
      .toPromise();
  }


  public async search (student: Student, notInGroup: boolean = false): Promise<Student[]> {
    return this.apiService.post(this.apiPath + '/search', {
      StudentSearch: {
        ...student,
        notInGroup: notInGroup
      }
    })
    .map((response: IApiData) => {
      const students = [];
      response.data.forEach(data => students.push(new Student(data)));

      return students;
    })
    .toPromise();
  }


  public async create(student: Student) {
    return this.apiService.post(this.apiPath, {
       Student: {
         name: student.name,
         surname: student.surname,
         patronymic: student.patronymic,
         email: student.email,
         role: Student.ROLE_STUDENT
       }
    })
    .map((response: IApiData) => {
      if (response.success) {
        const user = new Student(response.data);
        this.events.created.next(user);
        return user;
      }

      throw new ApiError(response.status, response.data);
    })
    .toPromise();
  } 


  public async delete(id: number): Promise<boolean> {
    return this.apiService.delete(this.apiPath + `/${id}`)
      .map((result: boolean) => {

        if (result) {
          this.events.deleted.next(id);
        }

        return result;
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
