import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: "home",
    loadChildren :()=> import('./home/home.module').then(m=>m.HomeModule)
  },
  {
    path: "booking",
    loadChildren :()=> import('./bookins/bookins.module').then(m=>m.BookinsModule)
  },
  {
    path: "about",
    loadChildren :()=> import('./about/about.module').then(m=>m.AboutModule)
  },
   {
    path: "**",
   redirectTo: 'home'
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavbarRoutingModule { }
