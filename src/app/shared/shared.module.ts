import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
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
import { CarouselModule } from 'ng-carousel-cdk';
import { CarouselComponent } from './carousel/carousel.component';
import { PaquetesComponent } from './paquetes/paquetes.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
  
    HeaderComponent,
    FootherComponent,
    CardComponent,
    BannerComponent,
    CarouselComponent,
    PaquetesComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule, 
    CarouselModule,
    MatDialogModule,    
  ],
  exports:[
    HeaderComponent,
    FootherComponent,
    CardComponent,
    BannerComponent,
    MatIconModule, 
    CarouselComponent,
    PaquetesComponent,
    
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule { }
