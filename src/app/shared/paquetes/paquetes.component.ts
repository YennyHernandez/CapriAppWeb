import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Packag} from 'src/app/interfaces/media-storage.interface';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.scss']
})
export class PaquetesComponent {
  @Input() package: Packag = {
    id: "",
    namePackage:"", 
    slogan: "",
    description:"",
    price: 0,
    menu:[],
    mediaType: "",
    urlDescarga:"",
  };
  constructor(public dialog: MatDialog) {}


  openModal(package_id : string): void {
     this.dialog.open(ModalComponent, {data: {
      idPackage: package_id // Pasamos id package como dato al modal
      
    }}); 
    console.log("pasando id al modal 👍", this.package ) 
  }
  
}
