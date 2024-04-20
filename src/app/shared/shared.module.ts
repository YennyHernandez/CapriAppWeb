import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FootherComponent } from './foother/foother.component';
import { CardComponent } from './card/card.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
  
    HeaderComponent,
    FootherComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    MatCardModule
    
  ],
  exports:[
    HeaderComponent,
    FootherComponent,
    CardComponent,
    
  ]
})
export class SharedModule { }
