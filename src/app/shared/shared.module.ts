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
    
  ],
  exports:[
    HeaderComponent,
    FootherComponent,
    CardComponent,
    BannerComponent,
    
  ]
})
export class SharedModule { }
