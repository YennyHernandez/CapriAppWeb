import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarRoutingModule } from './navbar-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavbarComponent } from './navbar-pages/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    NavbarRoutingModule,
    SharedModule,
    MatSidenavModule,
    MatListModule,      
    MatToolbarModule,
  ],
})
export class NavbarModule { }
