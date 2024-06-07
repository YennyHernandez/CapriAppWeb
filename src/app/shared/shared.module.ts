import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FootherComponent } from './foother/foother.component';
import { CardComponent } from './card/card.component';
import { MatCardModule } from '@angular/material/card';
import { BannerComponent } from './banner/banner.component';
import {MatSelectModule} from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
  
    HeaderComponent,
    FootherComponent,
    CardComponent,
    BannerComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule, 
      
  ],
  exports:[
    HeaderComponent,
    FootherComponent,
    CardComponent,
    BannerComponent,
    MatIconModule, 
    
  ]
})
export class SharedModule { }
