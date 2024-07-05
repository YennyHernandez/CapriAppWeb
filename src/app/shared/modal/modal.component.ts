import { Component, ViewChild, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { typePackages,colorPackages, productosExtra, bebidas} from '../../constants/paquetes'; // Asegúrate de importar typePackages desde la ubicación correcta
import { Packag, ProductPrice} from 'src/app/interfaces/media-storage.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  typePackages: Packag[] = typePackages; 
  colorPackages: string[] = colorPackages;
  productosExtra: ProductPrice[] = productosExtra;
  bebidas: ProductPrice[] = bebidas;
  idPackage: string = '';
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  selectedPackage: Packag | null;
  titlePanelMenu: string = ""; 
  titlePanelBebida: string = ""; 
  formulario!: FormGroup;

  constructor(public dialogRef: MatDialogRef<ModalComponent>, private fb: FormBuilder,
     @Inject(MAT_DIALOG_DATA) public data: { idPackage: string }
  ) {
    this.idPackage = data.idPackage;
    this.selectedPackage = this.typePackages.find(item => item.id === this.idPackage) || null;
    console.log(this.selectedPackage, "💓")
    if( this.idPackage === "paqueteDescanso"){
      this.titlePanelMenu = "Añadir menú";
      this.titlePanelBebida = "Añadir Bebida";
    }
    else {
      this.titlePanelMenu = "Elige tu menú";
      this.titlePanelBebida = "Elige tu Bebida";
    }
  }
  ngOnInit(): void {
    this.formulario = this.fb.group({});
  
    this.colorPackages.forEach(color => {
      this.formulario.addControl(color, this.fb.control(false));
    });
  
    if (this.selectedPackage) {
      this.selectedPackage.menu.forEach(menuItem => {
        this.formulario.addControl(menuItem.producto, this.fb.control(false));
      });
    }
  
    this.bebidas.forEach(bebida => {
      this.formulario.addControl(bebida.producto, this.fb.control(false));
    });
  
    this.productosExtra.forEach(extra => {
      this.formulario.addControl(extra.producto, this.fb.control(false));
    });
  }
  onSubmit() {
    if (this.formulario.valid) {
      console.log("form validoo ✅",this.formulario.value ); // Enviar datos al servidor u otra lógica
    } else {
      /* // Marcar los campos inválidos si es necesario
      Object.keys(this.formulario.controls).forEach(field => {
        const control = this.formulario.get(field);
        control.markAsTouched({ onlySelf: true });
      }); */
      console.log("form invalido")
    }
  }
  close(): void {
    this.dialogRef.close();
  }
}
