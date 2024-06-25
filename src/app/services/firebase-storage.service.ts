import { Injectable, OnInit } from '@angular/core';
import { storage } from '../../../firebase-config';
import { ref, getDownloadURL, StorageReference } from "firebase/storage";
import { Subject } from 'rxjs';
import { MediaLiteralsObject, PackageUrl, Packag} from "../interfaces/media-storage.interface"
type x = keyof MediaLiteralsObject;
import { typePackages, media } from "../constants/paquetes"


@Injectable({
  providedIn: 'root' /* Realiza solo 1 instancia del servicio al definirlo en la raiz */
})
export class FirebaseStorageService {
  typePackages = typePackages; //paquetes
  media = media; //media
  flag = false;
  storageMediaSubject = new Subject<MediaLiteralsObject>
  storagePaquetesSubject = new Subject<PackageUrl[]>;

  constructor() {
    this.initStorageUrls()
    this.initUrlsDataPaquetes()
    console.log("se inicilizo 1 vez")
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

  private async initUrlsDataPaquetes() { //Get de urls paquetes
    const urlDataPaquetes = (this.typePackages).map(async (item) => {
      const storageRef: StorageReference = ref(storage, item.urlDescarga);
      try {
        const url = await getDownloadURL(storageRef);
        console.log("descargando url image paquetes")
        return {
          ...item, url
        } as PackageUrl
      }
      catch (error) {
        console.error('Error al obtener la URL de descarga paquetes:', error);
        return
      }
    });

    const data = (await Promise.all(urlDataPaquetes)) as PackageUrl[]
    this.storagePaquetesSubject.next(data);

    console.log('typePackages actualizados con URLS', this.initUrlsDataPaquetes);

  }


}



