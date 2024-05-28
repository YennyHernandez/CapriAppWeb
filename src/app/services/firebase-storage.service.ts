import { Injectable, OnInit } from '@angular/core';
import { storage } from '../../../firebase-config';
import {  ref, getDownloadURL, StorageReference} from "firebase/storage";

interface MediaPaquetesLiteralsObject {
  paqueteEnamorados: MediaPaquetes;
  paqueteCelebracion: MediaPaquetes;
  paqueteDescanso: MediaPaquetes;
  ordeño: MediaPaquetes;
  velada: MediaPaquetes;
  atardecer: MediaPaquetes;
  fogata: MediaPaquetes;
  comida:MediaPaquetes;
  alimentar:MediaPaquetes;
  aventura: MediaPaquetes;
}

interface MediaPaquetes {
  mediaType: 'image' | 'video';
  urlDescarga: string;
  url: string;
}

type x = keyof MediaPaquetesLiteralsObject;

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {
  media: MediaPaquetesLiteralsObject = {
    paqueteEnamorados: { mediaType: 'image', urlDescarga: 'generic/paquete_enamorados.jpg', url: '' },
    paqueteCelebracion: { mediaType: 'image', urlDescarga: 'generic/paquete_celebracion.jpg', url: '' },
    paqueteDescanso: { mediaType: 'image', urlDescarga: 'generic/paquete_interaccion.jpg', url: '' },
    ordeño: { mediaType: 'image', urlDescarga: 'generic/ordeno.JPG', url: '' },
    velada: { mediaType: 'image', urlDescarga: 'generic/velada.jpg', url: '' },
    atardecer: { mediaType: 'image', urlDescarga: 'generic/atardeceres.JPG', url: '' },
    fogata: { mediaType: 'image', urlDescarga: 'generic/fogata.JPG', url: '' },
    comida: { mediaType: 'image', urlDescarga: 'generic/comida.jpg', url: '' },
    alimentar: { mediaType: 'image', urlDescarga: 'generic/alimentar.jpg', url: '' },
    aventura: { mediaType: 'video', urlDescarga: 'generic/video_aventura.mov', url: '' },
  };

  constructor() {
    this.initStorageUrls();
  }

  async initStorageUrls(): Promise<void> {
    const promises = Object.keys(this.media).map(async (key) => {
      const ruta = this.media[key as keyof MediaPaquetesLiteralsObject].urlDescarga;
      const storageRef: StorageReference = ref(storage, ruta);
      try {
        const url = await getDownloadURL(storageRef);
        this.media[key as keyof MediaPaquetesLiteralsObject].url = url;
      } catch (error) {
        console.error('Error al obtener la URL de descarga:', error);
      }
    });
    await Promise.all(promises);
    console.log('Todos los archivos han sido cargados.');
  }
}



