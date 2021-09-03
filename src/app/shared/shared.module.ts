import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule , ReactiveFormsModule} from '@angular/forms'
import {FilterPipe} from "./pipe/filter.pipe"
import {SIPipe} from "./pipe/si.pipe"
import {WeekType} from "./pipe/week-type.pipe"
import {ImagePipe} from "./pipe/image.pipe"
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    FilterPipe,
    SIPipe,
    WeekType,
    ImagePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports : [
    FilterPipe,
    SIPipe,
    WeekType,
    ImagePipe,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class SharedModule { }
