import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { firebaseConfig } from '../../firebase-config';
import { NavbarModule } from './modules/navbar/navbar.module';
import { LoginModule } from './auth/login/login.module';
import { FirebaseStorageService } from './services/firebase-storage.service';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { UserModule } from './modules/user/user.module';
import { AdminModule } from './modules/admin/admin.module';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    NavbarModule,
    LoginModule,
    UserModule,
    AdminModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,

  ], 
  providers: [
    FirebaseStorageService,
    { provide: LOCALE_ID, useValue: 'es' } ,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
function providerStorage(arg0: () => import("@firebase/storage").FirebaseStorage): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}

