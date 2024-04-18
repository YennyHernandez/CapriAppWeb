import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './modules/navbar/navbar-pages/navbar.component';

const routes: Routes = [
  {    
    path:"auth",
   loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)
  },   
  {    
    path:"",
    component: NavbarComponent,
    loadChildren: () => import('./modules/navbar/navbar.module').then(m => m.NavbarModule)
     
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
