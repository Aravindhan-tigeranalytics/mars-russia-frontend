import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule , ReactiveFormsModule} from '@angular/forms'
import {FilterPipe} from "./pipe/filter.pipe"
import {SIPipe} from "./pipe/si.pipe"
import {WeekType} from "./pipe/week-type.pipe"



@NgModule({
  declarations: [
    FilterPipe,
    SIPipe,
    WeekType
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports : [
    FilterPipe,
    SIPipe,
    WeekType,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
