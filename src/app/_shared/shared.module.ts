import { NgModule          } from '@angular/core';
import { CommonModule      } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { RoutingAnimationComponent } from './routing-animation/routing-animation.component';
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
 ],
 exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RoutingAnimationComponent,
    AlertComponent,
 ]
})
export class SharedModule { }
