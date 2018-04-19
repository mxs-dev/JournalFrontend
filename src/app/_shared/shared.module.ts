import { NgModule          } from '@angular/core';
import { CommonModule      } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { RoutingAnimationComponent } from './routing-animation/routing-animation.component';
import { PaginationComponent } from './pagination/pagination.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
 ],
 declarations: [
    RoutingAnimationComponent,
    AlertComponent,
    PaginationComponent,
 ],
 exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RoutingAnimationComponent,
    AlertComponent,
    PaginationComponent
 ]
})
export class SharedModule { }
