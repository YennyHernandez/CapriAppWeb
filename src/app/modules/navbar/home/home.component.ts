import { Component } from '@angular/core';
import { FirebaseStorageService } from 'src/app/services/firebase-storage.service';
import { Subscription } from 'rxjs';
import { PackageUrl } from "../../../interfaces/media-storage.interface"



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
  typePackagesUrls: PackageUrl[] = [];
  selectedValue: string = "selecciona";
  tiles: Tile[] = [];
  cols: number = 6;
  observerStorageMedia!: Subscription
  observerStoragePaquetes!: Subscription
  subscriptions: Subscription[] = [];

  constructor(public firebaseStorageService: FirebaseStorageService) {

  }
  ngOnInit(): void {
    this.calcularColumnas(); //calcula la primera vez
    window.addEventListener('resize', () => {
      this.calcularColumnas(); //re calcula al cambio de pantalla
    });
    this.observerStorageMedia = this.firebaseStorageService.storageMediaSubject.subscribe(data => {
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
    this.observerStoragePaquetes = this.firebaseStorageService.storagePaquetesSubject.subscribe(data => {
      this.typePackagesUrls = data;
    })
    this.subscriptions.push(this.observerStorageMedia, this.observerStoragePaquetes)
    console.log("entrandooo a init de home")
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  calcularColumnas() {
    if (window.innerWidth <= 768) {
      this.cols = 2;
    } else {
      this.cols = 6;
    }
  }
  

}
