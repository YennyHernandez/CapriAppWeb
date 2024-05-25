import { Injectable, OnInit } from '@angular/core';
import { storage } from '../../../firebase-config';
import {  ref, getDownloadURL, StorageReference} from "firebase/storage";

interface ImgPaquetesLiteralsObject{
  imgPaqueteEnamorados: ImgPaquetes;
  imgPaqueteCelebracion: ImgPaquetes;
  imgPaqueteDescanso: ImgPaquetes;
}

interface ImgPaquetes{
  imagen: string;
  urlDescarga: string;
}

type x = keyof ImgPaquetesLiteralsObject;

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  imagenes: ImgPaquetesLiteralsObject = {
    imgPaqueteEnamorados: { imagen: '', urlDescarga: 'generic/paquete_enamorados.jpg' },
    imgPaqueteCelebracion: { imagen: '', urlDescarga: 'generic/paquete_celebracion.jpg' },
    imgPaqueteDescanso: { imagen: '', urlDescarga: 'generic/paquete_interaccion.jpg' },
  };
  constructor() {
    this.initStorageUrls();
  }
  async initStorageUrls(): Promise<void> {
    const promises = Object.keys(this.imagenes).map(async (key) => {
      const ruta = this.imagenes[key as x].urlDescarga;
      const storageRef: StorageReference = ref(storage, ruta);
      try {
        const url = await getDownloadURL(storageRef);
        this.imagenes[key as x].imagen = url;
      } catch (error) {
        console.error('Error al obtener la URL de descarga:', error);
      }
    });
    return Promise.all(promises).then(() => {
      console.log('Todas las imágenes han sido cargadas.');
    });
  }
}




