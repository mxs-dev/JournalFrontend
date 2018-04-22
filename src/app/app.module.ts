import { NgModule          } from '@angular/core';
import { NgbModule         } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule        } from 'angular2-jwt';
import { BrowserModule     } from '@angular/platform-browser';
import { HttpClientModule  } from '@angular/common/http';


// Modules
import { SharedModule     } from './_shared/shared.module';
import { AppRoutingModule } from './app.routing';
import { LoginModule      } from './login/login.module';

// Components
import { AppComponent } from './app.component';
import { INDEX_PAGE, TestComponent   } from './index';
import { OverlayTestComponent } from './_shared/overlay/overlay-test.component';

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


@NgModule({
   imports: [
      BrowserModule,
      HttpClientModule,
      SharedModule,
      AppRoutingModule,
      AuthModule,
      NgbModule.forRoot(),
      LoginModule,
   ],
   declarations: [
      AppComponent,
      INDEX_PAGE,
      MainLayoutComponent,
      P404Component,
      OverlayTestComponent
   ],
   providers: [ 
    SERVICES, GUARDS,
  ],
  entryComponents: [  
    TestComponent,
    OverlayTestComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
