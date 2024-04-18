import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FootherComponent } from './foother/foother.component';



@NgModule({
  declarations: [
  
    HeaderComponent,
    FootherComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule
    
  ],
  exports:[
    HeaderComponent,
    FootherComponent
  ]
})
export class SharedModule { }
