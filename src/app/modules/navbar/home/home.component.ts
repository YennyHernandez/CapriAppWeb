import { Component, OnInit } from '@angular/core';
import { storage } from '../../../../../firebase-config';
import {  ref, getDownloadURL, StorageReference} from "firebase/storage";
export interface Tile {
  color?: string;
  imageURL? : string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  
})
export class HomeComponent implements OnInit {
  rutaImagenPaquete1: string = ''; 
  rutaImagenPaquete2: string = '';
  rutaImagenPaquete3: string = '';
  constructor() {}

  ngOnInit() {
    // Referencias a las imágenes en Firebase Storage
    
    const storageRef1: StorageReference = ref(storage, 'generic/paquete_enamorados.jpg');
    const storageRef2: StorageReference = ref(storage, 'generic/paquete_celebracion.jpg');
    const storageRef3: StorageReference = ref(storage, 'generic/paquete_interaccion.jpg');
    getDownloadURL(storageRef1)

    // URL de descarga de cada imagen
    Promise.all([
      getDownloadURL(storageRef1),
      getDownloadURL(storageRef2),
      getDownloadURL(storageRef2),
    ]).then(urls => {
      // Asignación de las URLs de descarga a las variables
      this.rutaImagenPaquete1 = urls[0];
      this.rutaImagenPaquete2 = urls[1];
      this.rutaImagenPaquete3 = urls[2];
    }).catch(error => {
      // Manejo de errores
      console.error('Error al obtener las URLs de descarga:', error);
    });
  }
  
  selectedValue: string = "selecciona";
  tiles: Tile[] = [
    {text: 'One', cols: 2, rows: 3, imageURL: '../../../../assets/banner.jpg', color: "lightpink"},
    {text: 'Two', cols: 1, rows: 2, imageURL: '../../../../assets/banner.jpg',  color: "lightpink"},
    {text: 'Three', cols: 2, rows: 2,imageURL: '../../../../assets/banner.jpg' ,  color: "lightpink"},
    {text: 'Four', cols: 1, rows: 2,imageURL: '../../../../assets/banner.jpg' ,  color: "lightpink"},
    {text: 'Five', cols: 1, rows: 3, imageURL: '../../../../assets/banner.jpg',  color: "lightpink"},
    {text: 'Six', cols: 3, rows: 3, imageURL: '../../../../assets/banner.jpg',  color: "lightpink"},
    {text: 'Seven', cols: 2, rows: 2,imageURL: '../../../../assets/banner.jpg' ,  color: "lightpink"},
    
  ];
}
