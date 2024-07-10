import { Injectable, OnInit } from '@angular/core';
import { storage } from '../../../firebase-config';
import { ref, getDownloadURL, StorageReference } from "firebase/storage";
import { BehaviorSubject} from 'rxjs';
import { MediaLiteralsObject, PackageUrl, Packag} from "../interfaces/media-storage.interface"
type x = keyof MediaLiteralsObject;
import { typePackages, media } from "../constants/paquetes"


@Injectable({
  providedIn: 'root' /* Realiza solo 1 instancia del servicio al definirlo en la raiz */
})
export class FirebaseStorageService {
  typePackages = typePackages; //paquetes
  media = media; //media
  
  private createEmptyMediaData(): MediaLiteralsObject {
    const keys = Object.keys(media) as Array<keyof MediaLiteralsObject>;
    const emptyData = {} as MediaLiteralsObject;
    keys.forEach(key => {
      emptyData[key] = { url: '', urlDescarga: '', mediaType:'image'};
    });
    return emptyData;
  }

  private initialMediaData: MediaLiteralsObject = this.createEmptyMediaData();
  private initialPackageUrls: PackageUrl[] = [];
  storageMediaSubject = new BehaviorSubject<MediaLiteralsObject>(this.initialMediaData);
  storagePaquetesSubject = new BehaviorSubject<PackageUrl[]>(this.initialPackageUrls);

  constructor() {
    this.initStorageUrls()
    this.initUrlsDataPaquetes()
    console.log("se inicilizo 1 vez el servivio")
  }

  private async initStorageUrls() { //get de urls media
    const urlData = Object.keys(this.media).map(async (key) => {
      const ruta = this.media[key as keyof MediaLiteralsObject].urlDescarga;
      const storageRef: StorageReference = ref(storage, ruta);
      try {
        const url = await getDownloadURL(storageRef);
        console.log('descargando');
        this.media[key as keyof MediaLiteralsObject].url = url;
      } catch (error) {
        console.error('Error al obtener la URL de descarga:', error);

      }

    });
    await Promise.all(urlData)
    console.log('Todas las URLS descargadas');
    this.storageMediaSubject.next(this.media)
  }

  private async initUrlsDataPaquetes() { // Get de URLs paquetes
    const urlDataPaquetes = this.typePackages.map(async (item) => {    // Procesar las URLs del carrusel  
      const urlsCarousel = await Promise.all(item.itemsUrlDescarga.map(async (url) => {
        const storageRefcarousel: StorageReference = ref(storage, url);
        try {
          const urlsCarouselDownLoad = await getDownloadURL(storageRefcarousel);
          console.log("descargando url image carousel");
          return urlsCarouselDownLoad; // Devolver la URL descargada
        } catch (error) {
          console.error('Error urls carousel:', error);
          return null; 
        }
      }));  
      const storageRef: StorageReference = ref(storage, item.urlDescarga);  // Procesar la URL del paquete
      try {
        const url = await getDownloadURL(storageRef);
        console.log("descargando url image paquetes");
        return {
          ...item,
          url,
          urlsCarousel:  urlsCarousel.filter(url => url !== null)
        } as PackageUrl;
      } catch (error) {
        console.error('Error al obtener la URL de descarga paquetes:', error);
        return null; 
      }
    });
  
    // Esperar a que todas las promesas se resuelvan
    const data = (await Promise.all(urlDataPaquetes)).filter(item => item !== null) as PackageUrl[];
    this.storagePaquetesSubject.next(data);
    console.log('typePackages actualizados con URLS', data);
  }
  


}



