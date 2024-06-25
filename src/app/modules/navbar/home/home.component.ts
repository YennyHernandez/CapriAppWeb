import { Component } from '@angular/core';
import { FirebaseStorageService } from 'src/app/services/firebase-storage.service';
import { MediaPaquetesLiteralsObject } from 'src/app/interfaces/media-storage.interface';
import { Subscription } from 'rxjs';
import {typePackages} from "../../../constants/paquetes"

export interface Tile {
  imageURL?: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent {
  typePackages = typePackages
  selectedValue: string = "selecciona";
  tiles: Tile[] = [];
  cols: number = 6;
  observerStorage!: Subscription

  constructor(public firebaseStorageService: FirebaseStorageService) {
   
  }


  ngOnInit(): void {
    this.calcularColumnas(); //calcula la primera vez
    window.addEventListener('resize', () => {
      this.calcularColumnas(); //re calcula al cambio de pantalla
    });
    this.observerStorage = this.firebaseStorageService.storageSubject.subscribe(data => {
      typePackages.find((pack, index) =>{
        console.log(pack.id, data.paqueteEnamorados.url)
        if(pack.id === "paqueteEnamorados"){
          this.typePackages[index].imagenPackage = data.paqueteEnamorados.url
        } 
        if(pack.id === "paqueteCelebracion"){
          this.typePackages[index].imagenPackage = data.paqueteCelebracion.url
        }
        if(pack.id === "paqueteDescanso"){
          this.typePackages[index].imagenPackage = data.paqueteDescanso.url
        }
        
      })
      console.log(this.typePackages)
      this.tiles = [
        { text: 'Almentar Cabritas', cols: 2, rows: 2, imageURL: data.alimentar.url },
        { text: 'Ver Atardeceres', cols: 2, rows: 4, imageURL: data.atardecer.url },
        { text: 'Veladas Romanticas', cols: 2, rows: 2, imageURL: data.velada.url, },
        { text: 'Ordeñar', cols: 2, rows: 4, imageURL: data.ordeño.url },
        { text: 'Hacer Fogata', cols: 2, rows: 4, imageURL: data.fogata.url },
        { text: 'Comer delicioso', cols: 2, rows: 2, imageURL: data.comida.url },

      ];
    }
    )

  }
  calcularColumnas() {
    if (window.innerWidth <= 768) {
      this.cols = 2;
    } else {
      this.cols = 6;
    }
  }

}
