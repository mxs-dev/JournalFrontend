import { NgModule          } from '@angular/core';
import { NgbModule         } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule        } from 'angular2-jwt';
import { BrowserModule     } from '@angular/platform-browser';
import { HttpClientModule  } from '@angular/common/http';

// PerfectScrollbar
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';


// Modules
import { SharedModule     } from './_shared/shared.module';
import { AppRoutingModule } from './app.routing';
import { LoginModule      } from './login/login.module';

// Components
import { AppComponent } from './app.component';

// Layouts
import { MainLayoutComponent } from './_layouts/main-layout.component';
import { P404Component } from './_pages/404.component';

import { SERVICES  } from './_shared/services/index';
import { GUARDS    } from './_shared/guards/index';


// RxJs
import 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/catch';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
   imports: [
      BrowserModule,
      HttpClientModule,
      PerfectScrollbarModule,
      SharedModule,
      AppRoutingModule,
      AuthModule,
      NgbModule.forRoot(),
      LoginModule,
   ],
   declarations: [
      AppComponent,
      MainLayoutComponent,
      P404Component,
   ],
   providers: [ 
     SERVICES, GUARDS,
      {
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      } 
    ],
   bootstrap: [ AppComponent ]
})
export class AppModule { }
