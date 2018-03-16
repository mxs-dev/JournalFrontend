import { Injectable } from '@angular/core';

import { ApiService } from '../_services/index';

import { User, IApiData } from '../_models/index';

@Injectable()
export class UserFactory {
  public getUserFromData(data: any) {
    const u = new User();

    u.id = data.id;
    u.password = data.password;
    u.email    = data.email;

    u.name    = data.name;
    u.surname = data.surname;
    u.patronymic = data.patronymic;

    u.role   = data.role;
    u.status = data.status;

    u.createdAt = data.createdAt;
    u.createdBy = data.createdBy;
    u.updatedAt = data.updatedAt;
    u.updatedBy = data.updatedBy;

    u.lastLoginAt = data.lastLoginAt;

    return u;
  }
}
