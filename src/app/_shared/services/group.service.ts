import { Injectable } from '@angular/core';

import { BaseService } from './base.service';
import { ApiService } from './api.service';
import { IApiData, Group, User, ApiError } from '../models';


@Injectable()
export class GroupService extends BaseService<Group> {

  protected readonly modelClass = Group;
  protected readonly apiPath = '/group';


  public async create(title: string): Promise<Group> {
    return super.create({GroupRecord: {title, course: 1}});
  }


  public async update(model: Group, groupData: Group): Promise<Group> {
    return super.update(model, {GroupRecord: groupData});
  }


  public async search(title: string): Promise<Group[]> {
    return [];
  }


  public async getStudents(id: number): Promise<User[]> {
    return this.apiService.get(`${this.apiPath}/${id}/students`)
      .map((response: IApiData) => {
        const students = new Array<User>();

        response.data.forEach(studentData => {
          students.push(new User(studentData));
        });

        return students;
      })
      .toPromise();
  }


  public async addStudent(groupId: number, studentId: number): Promise<boolean> {
    return this.apiService.get(this.apiPath + `/${groupId}/add-student/${studentId}`)
      .map((response: IApiData) => {
        if (response.status === 201) {
          return true;
        }

        throw new ApiError(response.status, response.data);
      })
      .toPromise();
  }


  public async removeStudent(groupId: number, studentId: number): Promise<boolean> {
    return this.apiService
      .delete(this.apiPath + `/${groupId}/rm-student/${studentId}`)
      .toPromise();
  }
}
