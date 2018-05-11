import { NgModule          } from '@angular/core';
import { NgbModule         } from '@ng-bootstrap/ng-bootstrap';
// import { AuthModule        } from 'angular2-jwt';
import { BrowserModule     } from '@angular/platform-browser';
import { HttpModule  } from '@angular/http';
import { AdminModule } from './admin/admin.module';

// Modules
import { SharedModule     } from './_shared/shared.module';
import { AppRoutingModule } from './app.routing';
import { LoginModule      } from './login/login.module';

// Components
import { AppComponent } from './app.component';
import { INDEX_PAGE } from './index';

// Layouts
import { MainLayoutComponent } from './_layouts/main-layout.component';
import { P404Component } from './_pages/404.component';

import { SERVICES  } from './_shared/services';
import { GUARDS    } from './_shared/guards';
import { DIRECTIVES } from './_shared/directives';

// RxJs
import 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/catch';


@NgModule({
   imports: [
      BrowserModule,
      HttpModule,
      NgbModule.forRoot(),
      SharedModule,
      AppRoutingModule,
      LoginModule,
      // AuthModule,
   ],
   declarations: [
      AppComponent,
      INDEX_PAGE,
      MainLayoutComponent,
      P404Component
   ],
   providers: [
    SERVICES, GUARDS,
  ],
  entryComponents: [
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
