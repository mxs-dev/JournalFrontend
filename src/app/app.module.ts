import { NgModule          } from '@angular/core';
import { NgbModule         } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule        } from 'angular2-jwt';
import { BrowserModule     } from '@angular/platform-browser';
import { HttpClientModule  } from '@angular/common/http';


import { AppComponent } from './app.component';


// Modules
import { AppRoutingModule } from './app.routing';
import { LoginModule } from './login/login.module';


// Layouts 
import { MainLayoutComponent } from './_layouts/main-layout.component';
import { P404Component } from './_pages/404.component';


import { SERVICES } from './_services/index';


// RxJs
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
      MainLayoutComponent,
      P404Component,
   ],
   providers: [ SERVICES ],
   bootstrap: [ AppComponent ]
})
export class AppModule { }
