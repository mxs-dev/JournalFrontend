import { Injectable } from '@angular/core';

import { BaseService } from './base.service';
import { Teaches } from '../models';


@Injectable()
export class TeachesService extends BaseService<Teaches> {
  protected readonly modelClass = Teaches;
  protected readonly apiPath = '/teaches';
}
