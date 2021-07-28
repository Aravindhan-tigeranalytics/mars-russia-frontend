import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule , ReactiveFormsModule} from '@angular/forms'
import {FilterPipe} from "./pipe/filter.pipe"
import {SIPipe} from "./pipe/si.pipe"



@NgModule({
  declarations: [
    FilterPipe,
    SIPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports : [
    FilterPipe,
    SIPipe,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
