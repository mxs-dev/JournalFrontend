import { NgModule }         from '@angular/core';
import { NgbModule }        from '@ng-bootstrap/ng-bootstrap';
import { AuthModule }       from 'angular2-jwt';
import { BrowserModule }    from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


// Modules
import { LoginModule } from './login/login.module';


import { AppComponent } from './app.component';


import { SERVICES } from './_services/index';


// RxJs
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    NgbModule.forRoot(),
    LoginModule
  ],
  providers: [ SERVICES ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
