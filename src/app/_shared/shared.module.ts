import { NgModule          } from '@angular/core';
import { CommonModule      } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// PerfectScrollbar
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';


import { RoutingAnimationComponent } from './routing-animation/routing-animation.component';
import { PaginationComponent } from './pagination/pagination.component';
import { AlertComponent } from './alert/alert.component';

import { OverlayHostComponent } from './overlay/overlay-host.component';
import { OverlayComponent } from './overlay/overlay.component';
import { SERVICES } from './services';
import { GUARDS } from './guards';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};



@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PerfectScrollbarModule,
 ],
 declarations: [
    RoutingAnimationComponent,
    AlertComponent,
    PaginationComponent,
    OverlayComponent, OverlayHostComponent,
 ],
 providers: [
   {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  } 
 ],
 entryComponents: [
   OverlayComponent,
 ],
 exports: [
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
  PerfectScrollbarModule,
  RoutingAnimationComponent,
  AlertComponent,
  PaginationComponent,
  OverlayComponent, OverlayHostComponent,
],
})
export class SharedModule { }
