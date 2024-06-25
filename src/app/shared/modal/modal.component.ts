import { Component, ViewChild, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { typePackages,colorPackages, productosExtra, bebidas } from '../../constants/paquetes'; // Asegúrate de importar typePackages desde la ubicación correcta

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  typePackages: any[] = typePackages; 
  colorPackages: any[] = colorPackages;
  productosExtra: any[] = productosExtra;
  bebidas: any[] = bebidas;
  namePackage: string = '';
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  selectedPackage: any;
  titlePanelMenu: string = ""; 
  titlePanelBebida: string = ""; 

  constructor(public dialogRef: MatDialogRef<ModalComponent>, 
     @Inject(MAT_DIALOG_DATA) public data: { namePackage: string }
  ) {
    this.namePackage = data.namePackage;
    this.selectedPackage = this.typePackages.find(packagepq => packagepq.namePackage === this.namePackage);
    if (this.selectedPackage) {
      console.log(this.selectedPackage);
    } else {
      console.error(`No se encontró el paquete con nombre ${this.namePackage}`);
    }
    if( this.selectedPackage.namePackage === "Descanso"){
      this.titlePanelMenu = "Añadir menú"
      this.titlePanelBebida = "Añadir Bebida"
    }
    else{
      this.titlePanelMenu = "Elige tu menú"
      this.titlePanelBebida = "Elige tu Bebida"
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
