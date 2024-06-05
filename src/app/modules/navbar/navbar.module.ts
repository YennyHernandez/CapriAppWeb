import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarRoutingModule } from './navbar-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavbarComponent } from './navbar-pages/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
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
    MatIconModule,   
    MatToolbarModule,
  ],
})
export class NavbarModule { }
