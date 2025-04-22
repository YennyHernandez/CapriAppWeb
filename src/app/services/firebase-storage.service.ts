import { Injectable} from '@angular/core';
import { storage } from '../../../firebase-config';
import { collection, addDoc, doc, setDoc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase-config';
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
    this.initStorageUrls();
    this.initUrlsDataPaquetes();
  }

  private async initStorageUrls() { //get de urls media
    const urlData = Object.keys(this.media).map(async (key) => {
      const ruta = this.media[key as keyof MediaLiteralsObject].urlDescarga;
      const storageRef: StorageReference = ref(storage, ruta);
      try {
        const url = await getDownloadURL(storageRef);
        this.media[key as keyof MediaLiteralsObject].url = url;
      } catch (error) {
        console.error('Error al obtener la URL de descarga:', error);

      }

    });
    await Promise.all(urlData)
    this.storageMediaSubject.next(this.media)
  }

  private async initUrlsDataPaquetes() { // Get de URLs paquetes
    const urlDataPaquetes = this.typePackages.map(async (item) => {    // Procesar las URLs del carrusel  
      const urlsCarousel = await Promise.all(item.itemsUrlDescarga.map(async (url) => {
        const storageRefcarousel: StorageReference = ref(storage, url);
        try {
          const urlsCarouselDownLoad = await getDownloadURL(storageRefcarousel);
          return urlsCarouselDownLoad; // Devolver la URL descargada
        } catch (error) {
          console.error('Error urls carousel:', error);
          return null; 
        }
      }));  
      const storageRef: StorageReference = ref(storage, item.urlDescarga);  // Procesar la URL del paquete
      try {
        const url = await getDownloadURL(storageRef);
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
  }

  // Metodos CRUD firestorage database
  
  async guardarReserva(datosFormulario: any): Promise<void> {
    try {
        const docRef = await addDoc(collection(db, 'reservas'), datosFormulario);
    } catch (e) {
        console.error("Error agregando reserva: ", e);
    }
}

async getReservas(): Promise<any[]> {
  try {
      const querySnapshot = await getDocs(collection(db, 'reservas'));
      const reservas: any[] = [];
      querySnapshot.forEach((doc) => {
          reservas.push({ id: doc.id, ...doc.data() });
      });
      return reservas;
  } catch (e) {
      console.error("Error obteniendo reservas: ", e);
      return [];
  }
}
async updateStateBooking(bookingId: string, newState: string): Promise<void> {
  try {
    const reservaRef = doc(db, 'reservas', bookingId);
    await updateDoc(reservaRef, {
      stateBooking: newState
    });
  } catch (e) {
    console.error("Error al actualizar el estado de la reserva:", e);
  }
}
async updateBooking(bookingId: string, booking: any): Promise<void> {
  try {
    const reservaRef = doc(db, 'reservas', bookingId);
    await updateDoc(reservaRef, booking); 
  } catch (e) {
    console.error("Error al actualizar la reserva:", e);
  }
}
async deleteReserva(id: string): Promise<void> {
  try {
      const reservaRef = doc(db, 'reservas', id);
      await deleteDoc(reservaRef);
  } catch (e) {
      console.error("Error eliminando reserva: ", e);
  }
}
}



