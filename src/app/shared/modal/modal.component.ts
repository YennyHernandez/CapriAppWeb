import { Component, ViewChild, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { typePackages, colorPackages, productosExtra, bebidas } from '../../constants/paquetes'; // Asegúrate de importar typePackages desde la ubicación correcta
import { Packag, ProductPrice } from 'src/app/interfaces/media-storage.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { _ViewRepeaterOperation } from '@angular/cdk/collections';
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
  newPrice: Subject<number> = new Subject<number>();
  newCurrentPrice: number = 0;
  private newPriceSubscription: Subscription | undefined;
  isPaqDescanso = false;
  dataReservaToSend: any;


  constructor(public dialogRef: MatDialogRef<ModalComponent>, private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { idPackage: string }
  ) {
    this.idPackage = data.idPackage;
    this.selectedPackage = this.typePackages.find(item => item.id === this.idPackage) || null;
    this.newCurrentPrice = this.selectedPackage!.price;
    this.newPrice.next(this.newCurrentPrice);
    console.log(this.selectedPackage, "💓")
    if (this.idPackage === "paqueteDescanso") {
      this.isPaqDescanso = true;
      this.titlePanelMenu = "Añadir menú";
      this.titlePanelBebida = "Añadir Bebida";
    }
    else {
      this.titlePanelMenu = "Elige tu menú";
      this.titlePanelBebida = "Elige tu Bebida";
    }
  }
  ngOnInit(): void {
    this.formulario = this.fb.group({}); //creación del formulario dinámico

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

  sumar(producto: string, groupCheck:string ) {
    if(groupCheck === 'Color'){
      const productoArray = this.colorPackages
      const checked = this.formulario.get(producto)?.value;
      if(checked){
        productoArray.forEach((item) =>{
          if(item !== producto){
            this.formulario.get(item)?.setValue(false, {emitEvent: false})
          }         
        })
      }      
    }
    else if(groupCheck === 'Menu'){
      let priceSum = 0;
      const productoArray = this.selectedPackage!.menu
      console.log('entro a menu')
      if(this.idPackage === "paqueteDescanso"){
         priceSum = productoArray.find(extra => extra.producto === producto)?.price || 0
      } 
      this.doOperation(priceSum, producto, productoArray, groupCheck);
    }
    else if (groupCheck === 'Bebida'){
      let priceSum = 0;
      const productoArray = this.bebidas
      if(this.idPackage === "paqueteDescanso"){
        priceSum = productoArray.find(extra => extra.producto === producto)?.price || 0
     }
      this.doOperation(priceSum, producto, productoArray, groupCheck);
    }
    else if (groupCheck === 'Extra'){
      const productoArray = this.productosExtra
      let priceSum = productoArray.find(extra => extra.producto === producto)?.price || 0
      this.doOperation(priceSum, producto, productoArray,groupCheck);
    }
    else{
      console.log("No se econtro ningun grupo", groupCheck)
    }
  }

  doOperation(priceSum: number, producto:string, productArray : ProductPrice[], groupCheck:string) {
    if (this.newPriceSubscription) {
      this.newPriceSubscription.unsubscribe(); //desuscribirse para hacer una nueva
    }
    this.newPriceSubscription = this.newPrice.subscribe((value) => {
      const checked = this.formulario.get(producto)?.value;
      if(checked){
        this.newCurrentPrice = value + priceSum;
        if(groupCheck !== 'Extra' && this.idPackage !== 'paqueteDescanso'){
          productArray.forEach((item) =>{
            if(item.producto !== producto){
              this.formulario.get(item.producto)?.setValue(false, {emitEvent: false})
            }         
          })
        }
      }
      else{
        this.newCurrentPrice = value - priceSum
      }
    });
    this.newPrice.next(this.newCurrentPrice) //actualiza el nuevamente valor del precio
  }
  onSubmit() {
    if (this.formulario.valid) {
      this.dataReservaToSend = Object.keys(this.formulario.value).filter(key => this.formulario.get(key)?.value === true) // filtra la data de reserva
      console.log("form validoo ✅", this.formulario.value, this.dataReservaToSend);
    } else {
      console.log("form invalido")
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
