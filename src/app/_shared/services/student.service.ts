import { Injectable } from '@angular/core';

import { BaseService } from './base.service';
import { ApiService } from './api.service';
import { IApiData, Student, ApiError } from '../models';


@Injectable() 
export class StudentService extends BaseService<Student> {
  
  protected readonly modelClass = Student;
  protected readonly apiPath = '/student';


  public async create(modelData: Student): Promise<Student> {
    return super.create({Student: {...modelData, role: Student.ROLE_STUDENT}});
  } 


  public async update(model: Student, modelData: Student): Promise<Student> {
    return super.update(model, {Student: modelData});
  }

  
  public async search (modelData: Student, notInGroup: boolean = false): Promise<Student[]> {
    return super.search({StudentSearch: {...modelData, notInGroup: notInGroup}});
  }  
} 
