import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { IApiData, Group, User, ApiError } from '../_models';

import { Subject } from 'rxjs';


@Injectable()
export class GroupService {

  public events = {
    created: new Subject<Group>(),
    updated: new Subject<Group>(),
    deleted: new Subject<number>()
  };

  protected apiPath = '/group';


  public constructor (
    private apiService: ApiService
  ) {}


  public async get (id: number): Promise<Group> {
    return this.apiService.get(this.apiPath + `/${id}`)
      .map( (response: IApiData) => {
        return <Group> response.data;
      })
      .toPromise();
  }


  public async getAll (): Promise<Group[]> {
    return this.apiService.get(this.apiPath)
      .map((response: IApiData) => {
        return <Group[]> response.data;
      })
      .toPromise();
  }


  public async create(title: string): Promise<Group> {
    return this.apiService.post(
        this.apiPath,
        {
          GroupRecord: {
            title, 
            course: '1' // TODO: Разобраться с курсами
          }
        }
      )
      .map(data => {
        if (data.success) {
          const g = new Group(data.data);
          this.events.created.next(g);
          return g;
        }

        throw new Error('Error: ' + data.status);
      })
      .toPromise();
  }


  public async update(id: number, groupData: Group): Promise<Group> {
    return this.apiService.patch(
      this.apiPath + `/${id}`,
      {
        GroupRecord: groupData
      }
    )
    .map((response: IApiData) => {
      const group = new Group(response.data);
      this.events.updated.next(group);
      return group;
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
    return this.apiService.get(this.apiPath + `/${groupId}/rm-student/${studentId}`)
      .map((response: IApiData) => {
        return true;
      })
      .toPromise();
  }
}
