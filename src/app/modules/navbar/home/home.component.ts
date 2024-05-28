import { Component} from '@angular/core';
import { FirebaseStorageService } from 'src/app/services/firebase-storage.service';

export interface Tile {
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
export class HomeComponent{
  selectedValue: string = "selecciona";
  tiles: Tile[] = [];

  constructor(public firebaseStorageService: FirebaseStorageService) {
    this.auxInicializar();
    
  } 
  async auxInicializar(): Promise<void> {
    await this.firebaseStorageService.initStorageUrls();
    this.inicializarTiles();
  }
  inicializarTiles(): void{
    this.tiles= [
      {text: 'Almentar Cabritas', cols: 2, rows: 2, imageURL: this.firebaseStorageService.media.alimentar.url},
      {text: 'Ver Atardeceres', cols: 2, rows: 4, imageURL: this.firebaseStorageService.media.atardecer.url},
      {text: 'Veladas Romanticas', cols: 2, rows: 2,imageURL: this.firebaseStorageService.media.velada.url , },
      {text: 'Ordeñar', cols: 2, rows: 4,imageURL: this.firebaseStorageService.media.ordeño.url },
      {text: 'Hacer Fogata', cols: 2, rows: 4, imageURL: this.firebaseStorageService.media.fogata.url},
      {text: 'Comer delicioso', cols: 2, rows: 2, imageURL: this.firebaseStorageService.media.comida.url},
      
    ];
  }

  
}
