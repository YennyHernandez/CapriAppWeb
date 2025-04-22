
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {
  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  getCurrentUser() {
    return this.afAuth.currentUser;
  }

  onAuthStateChanged(callback: any) {
    return this.afAuth.onAuthStateChanged(callback);
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async register(email: string, password: string, name: string) {
    try {
      // Verifica si el correo ya está registrado
      const snapshot = await this.firestore.collection('usuarios', ref => ref.where('email', '==', email)).get().toPromise();
      
      if (!snapshot!.empty) {
        throw new Error('El correo de usuario ya está registrado.');
      }
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password); //crea usuario
      const user = userCredential.user;

      if (user) {
        await this.firestore.collection('usuarios').doc(user.uid).set({ //guarda los datos y el rol
          name: name,
          email: email,
          uid: user.uid,
          role: 'user'
        });
        return user;
      } else {
        throw new Error('No se pudo crear el usuario.');
      }
    } catch (err) {
      throw err; 
    }
  }
  
  
  logout() {
    return this.afAuth.signOut();
  }
}
