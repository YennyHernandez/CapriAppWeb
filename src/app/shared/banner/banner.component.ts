import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseStorageService } from 'src/app/services/firebase-storage.service';
import { ModalComponent } from '../modal/modal.component';
import {typePackages} from '.././../constants/paquetes'

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {
  dataPackages = typePackages;
  selectedPackageId: string = "" 
  constructor( public firebaseStorageService: FirebaseStorageService, public dialog: MatDialog ){
    
  }
  openModal(package_id : string): void {
    this.dialog.open(ModalComponent, {data: {
     idPackage: package_id // Pasamos id package como dato al modal
     
   }}); 
   console.log("pasando id al modal 👍") 
 }
 onSelectionChange(event: any): void {
  console.log("Selección cambiada:", event.value);
  this.selectedPackageId = event.value
  // Aquí puedes manejar el evento de cambio, si es necesario
}
  
}
