import { Injectable } from '@angular/core';

import { BaseService } from './base.service';
import { ApiService  } from './api.service';
import { Lesson, Teaches } from '../models';

import * as moment from 'moment';

@Injectable()
export class LessonService extends BaseService<Lesson> {
  protected readonly modelClass = Lesson;
  protected readonly apiPath = '/lesson';


  public async create(modelData: Lesson): Promise<Lesson> {
    return super.create({'LessonRecord': {
      ...modelData,
      date: moment(modelData.date).format('YYYY-MM-DD')
    }});
  }


  public async update(model: Lesson, modelData: Lesson):  Promise<Lesson> {
    return super.update(model, {'LessonRecord': {
      ...modelData,
      date: moment(modelData.date).format('YYYY-MM-DD')
    }});
  }


  public async getAllForTeachesId(teachesId: number): Promise<Lesson[]> {
    return;
  }
}
