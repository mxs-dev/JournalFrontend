import { NgModule          } from '@angular/core';
import { NgbModule         } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule        } from 'angular2-jwt';
import { BrowserModule     } from '@angular/platform-browser';
import { HttpClientModule  } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RoutingAnimationComponent } from './_directives/routing-animation/routing-animation.component';


// Modules
import { AppRoutingModule } from './app.routing';
import { LoginModule } from './login/login.module';


// Layouts
import { MainLayoutComponent } from './_layouts/main-layout.component';
import { P404Component } from './_pages/404.component';

import { FACTORIES } from './_factories/index';
import { SERVICES  } from './_services/index';
import { GUARDS    } from './_guards/index';


// RxJs
import 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@NgModule({
   imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      AuthModule,
      NgbModule.forRoot(),
      LoginModule,
   ],
   declarations: [
      AppComponent,
      RoutingAnimationComponent,
      MainLayoutComponent,
      P404Component,
   ],
   providers: [ SERVICES, GUARDS, FACTORIES ],
   bootstrap: [ AppComponent ]
})
export class AppModule { }
