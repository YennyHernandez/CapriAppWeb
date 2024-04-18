import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookinsRoutingModule } from './bookins-routing.module';
import { BookinsComponent } from './bookins.component';


@NgModule({
  declarations: [
    BookinsComponent
  ],
  imports: [
    CommonModule,
    BookinsRoutingModule
  ]
})
export class BookinsModule { }
