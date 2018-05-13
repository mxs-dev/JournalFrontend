import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

import { Lesson, Teaches } from '../models';

@Injectable()
export class LessonService extends BaseService<Lesson> {
  protected readonly modelClass = Lesson;
  protected readonly apiPath = '/lesson';


  public async create(modelData: Lesson): Promise<Lesson> {
    return super.create({'LessonRecord': modelData});
  }


  public async update(model: Lesson, modelData: Lesson):  Promise<Lesson> {
    return super.update(model, {'LessonRecord': modelData});
  }


  public async getForTeaches(teaches: Teaches): Promise<Lesson[]> {
    return;
  }
}
