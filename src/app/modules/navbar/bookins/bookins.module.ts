import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookinsRoutingModule } from './bookins-routing.module';
import { BookinsComponent } from './bookins.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    BookinsComponent
  ],
  imports: [
    CommonModule,
    BookinsRoutingModule,
    SharedModule
  ]
})
export class BookinsModule { }
