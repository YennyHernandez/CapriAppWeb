import { Component, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import { FirebaseStorageService } from 'src/app/services/firebase-storage.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import {Usuario} from 'src/app/interfaces/users.interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnDestroy  {
  
  email: string = "";
  password: string = "";
  nameUser: string = "";
  isRegister: boolean = false;
  private subscription: Subscription = new Subscription();
  constructor(public authFirebaseService : AuthFirebaseService, public firebaseStorageService : FirebaseStorageService,  private firestore: AngularFirestore, private router: Router){}
  login() {
    this.authFirebaseService.login(this.email, this.password)
      .then(cred => {
        const uid = cred.user?.uid;
        this.subscription =  this.firestore.collection('usuarios').doc(uid).get().subscribe({
          next: (doc) => {
            if (doc.exists) {
              const usuario = doc.data() as Usuario;

              if (usuario.rol === 'admin') {
                this.router.navigate(['/admin']);
              } else {
                this.router.navigate(['/home']);
              }
            }
          }
        });
      })
      .catch(() => {
        alert('Error de login');
      });
  }
  
  async register() {
    try {
      const user = await this.authFirebaseService.register(this.email, this.password, this.nameUser);
      this.router.navigate(['/home']);
    } catch (error: any) {
      if (error.message === 'El correo de usuario ya está registrado.') {
        alert('El correo de usuario ya está registrado.angular por favor, ingrese uno nuevo.');
      } else {
        // Manejo de otros errores
        alert('Hubo un problema al registrar el usuario. Por favor, inténtalo nuevamente.');
      }
      this.nameUser = "";
      this.email= "";
      this.password = "";
    }
  }
  
  
  changeSesionRegister(flag: boolean){
    this.isRegister = !flag;
  }
  ngOnDestroy() {
    // Desuscribirse cuando el componente se destruye
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
