import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarRoutingModule } from './navbar-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavbarComponent } from './navbar-pages/navbar.component';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    NavbarRoutingModule,
    SharedModule
  ]
})
export class NavbarModule { }
