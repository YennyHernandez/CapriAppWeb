import { Injectable, OnInit } from '@angular/core';
import { storage } from '../../../firebase-config';
import { ref, getDownloadURL, StorageReference } from "firebase/storage";
import { Subject } from 'rxjs';
import { MediaPaquetesLiteralsObject } from "../interfaces/media-storage.interface"
type x = keyof MediaPaquetesLiteralsObject;

@Injectable({
  providedIn: 'root' /* Realiza solo 1 instancia del servicio al definirlo en la raiz */
})
export class FirebaseStorageService {
  flag = false;
  storageSubject = new Subject<MediaPaquetesLiteralsObject>
  media: MediaPaquetesLiteralsObject = {
    paqueteEnamorados: { mediaType: 'image', urlDescarga: 'generic/paquete_enamorados.jpg', url: '' },
    paqueteCelebracion: { mediaType: 'image', urlDescarga: 'generic/paquete_celebracion.jpg', url: '' },
    paqueteDescanso: { mediaType: 'image', urlDescarga: 'generic/paquete_interaccion.png', url: '' },
    ordeño: { mediaType: 'image', urlDescarga: 'generic/ordeno.JPG', url: '' },
    velada: { mediaType: 'image', urlDescarga: 'generic/velada.jpg', url: '' },
    atardecer: { mediaType: 'image', urlDescarga: 'generic/atardeceres.JPG', url: '' },
    fogata: { mediaType: 'image', urlDescarga: 'generic/fogata.png', url: '' },
    comida: { mediaType: 'image', urlDescarga: 'generic/comida.jpg', url: '' },
    alimentar: { mediaType: 'image', urlDescarga: 'generic/alimentar.jpg', url: '' },
    aventura: { mediaType: 'video', urlDescarga: 'generic/video_aventura.mov', url: '' },
    banner: { mediaType: 'image', urlDescarga: 'generic/banner.png', url: '' },
    logocapri: { mediaType: 'image', urlDescarga: 'generic/logocapri.png', url: '' },
  };

  constructor() {
    this.initStorageUrls()
    console.log("se inicilizo 1 vez")
  }

  private async initStorageUrls() {
    const urlData = Object.keys(this.media).map(async (key) => {
      const ruta = this.media[key as keyof MediaPaquetesLiteralsObject].urlDescarga;
      const storageRef: StorageReference = ref(storage, ruta);
       try {
        const url = await getDownloadURL(storageRef); 
        console.log('descargando');
        this.media[key as keyof MediaPaquetesLiteralsObject].url = url; 
      } catch (error) {
        console.error('Error al obtener la URL de descarga:', error);
        
      } 
     
    });
    await Promise.all(urlData)
    console.log('Todas las URLS descargadas');
    this.storageSubject.next(this.media)
  
  }


}



