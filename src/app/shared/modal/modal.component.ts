import { Component, ViewChild, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { typePackages, colorPackages, productosExtra, bebidas } from '../../constants/paquetes'; // Asegúrate de importar typePackages desde la ubicación correcta
import { Packag, ProductPrice } from 'src/app/interfaces/media-storage.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { _ViewRepeaterOperation } from '@angular/cdk/collections';
import { GoogleEventService } from '../../services/google-events.service'
import {customValidator} from '../modal/validators/custom-validators'
declare var createGoogleEvent: any;
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
  private newPriceSubscriptionPerson: Subscription | undefined;
  isPaqDescanso = false;
  timeRanges: { [key: string]: { start: number; end: number } } = {
    '3-6 Pm': { start: 15, end: 18 }, // De 2:00 PM a 6:00 PM
    '7-9:30 Pm': { start: 19, end: 22 }, // De 7:00 PM a 9:30 PM
};


  availableTimes: string[] = Object.keys(this.timeRanges);
  dataReservaToSend: { [key: string]: any } = {};
  asyncValidator: any | string;
  constructor(public dialogRef: MatDialogRef<ModalComponent>, private fb: FormBuilder,  private googleEventService: GoogleEventService,
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
    this.formulario = this.fb.group({
      appointmentDate: ['', Validators.required],
      selectedTimeRange: ['', Validators.required],
      email:['', [Validators.required]],
      name:['', Validators.required],
      phone:['', [customValidator.requiredValidator, customValidator.phoneValidator]], 
      transferNumber:[0, Validators.required],
      numberPersonasExtra: [0],
      precioCotizadoPaquete:[0],
      nombrePaqueteReservado: ""
    }); //creación del formulario dinámico

    this.colorPackages.forEach(color => {
      this.formulario.addControl(color, this.fb.control(false));
    });

    if (this.selectedPackage) {
      this.selectedPackage.menu.forEach(menuItem => {
        this.formulario.addControl(menuItem.producto, this.fb.control(false)); //crea el control .fb.control
      });
    }

    this.bebidas.forEach(bebida => {
      this.formulario.addControl(bebida.producto, this.fb.control(false));
    });

    this.productosExtra.forEach(extra => {
      this.formulario.addControl(extra.producto, this.fb.control(false));
    });

  }

  sumar(producto: string, groupCheck: string) {
    let priceSum = 0;
    let productArray: ProductPrice[] = [];

    switch (groupCheck) {
      case 'Color':
        productArray = this.colorPackages.map(item => ({ producto: item, price: 0 }));;
        break;
      case 'Menu':
        productArray = this.selectedPackage!.menu;
        if (this.idPackage === "paqueteDescanso") {
          priceSum = productArray.find(extra => extra.producto === producto)?.price || 0;
        }
        break;
      case 'Bebida':
        productArray = this.bebidas;
        if (this.idPackage === "paqueteDescanso") {
          priceSum = productArray.find(extra => extra.producto === producto)?.price || 0;
        }
        break;
      case 'Extra':
        productArray = this.productosExtra;
        priceSum = productArray.find(extra => extra.producto === producto)?.price || 0;
        break;
      default:
        console.log("No se encontró ningún grupo", groupCheck);
        return;
    }

    this.doOperation(priceSum, producto, productArray, groupCheck);
  }


  doOperation(priceSum: number, producto: string, productArray: ProductPrice[], groupCheck: string) {
    if (this.newPriceSubscription) {
      this.newPriceSubscription.unsubscribe(); //desuscribirse para hacer una nueva
    }
    this.newPriceSubscription = this.newPrice.subscribe((value) => {
      const checked = this.formulario.get(producto)?.value;
      if (checked) {
        this.newCurrentPrice = value + priceSum;
        if (groupCheck !== 'Extra' && this.idPackage !== 'paqueteDescanso') {
          productArray.forEach((item) => {
            if (item.producto !== producto) {
              this.formulario.get(item.producto)?.setValue(false, { emitEvent: false })
            }
          })
        }
      }
      else {
        this.newCurrentPrice = value - priceSum
      }
    });
    this.newPrice.next(this.newCurrentPrice) //actualiza el nuevamente valor del precio
  }

  sumarPersonasExtra(operator: number) {
    const control = this.formulario.get('numberPersonasExtra');
    const valueControl = control!.value;
    if (valueControl>= 0 && operator>0 || valueControl>0 && operator<0  ){
      control!.setValue(valueControl + operator);
      console.log(valueControl + operator)
      if (this.newPriceSubscriptionPerson) {
        this.newPriceSubscriptionPerson.unsubscribe(); //desuscribirse para hacer una nueva
      }
      this.newPriceSubscriptionPerson = this.newPrice.subscribe((value) => {
        this.newCurrentPrice = value + (this.selectedPackage!.pricePersonExtra * operator);
      })
      this.newPrice.next(this.newCurrentPrice)
    }
  }
  onSubmit() {
    if (this.formulario.valid) {
      alert('Formulario enviado correctamente');
        this.formulario.get("nombrePaqueteReservado")?.setValue(this.selectedPackage?.namePackage);
        this.formulario.get("precioCotizadoPaquete")?.setValue(this.newCurrentPrice);

        const formValue = this.formulario.value;
        this.dataReservaToSend = Object.keys(formValue)
            .filter(key => formValue[key] !== false)
            .reduce((acumulador, key) => {
                acumulador[key] = formValue[key];
                return acumulador;
            }, {} as { [key: string]: any });

        console.log("Formulario válido ✅", this.formulario.value, this.dataReservaToSend);

        const appointmentDate = new Date(this.formulario.value.appointmentDate);
        const selectedRange = this.formulario.value.selectedTimeRange;
        const selectedHours = this.timeRanges[selectedRange as keyof typeof this.timeRanges];

        if (!selectedHours) {
            console.error("selectedHours is undefined");
            return;
        }

        // Ajustar la hora localmente para Bogotá (UTC-5)
        const startTime = new Date(appointmentDate);
        startTime.setUTCHours(selectedHours.start + 5, 0, 0); // Ajusta para UTC-5

        const endTime = new Date(appointmentDate);
        endTime.setUTCHours(selectedHours.end + 5, 0, 0); // Ajusta para UTC-5

        const eventDetails = {
            email: this.formulario.value.email,
            startTime: startTime.toISOString(), // Convertir a ISO después de ajustar
            endTime: endTime.toISOString(), // Convertir a ISO después de ajustar
        };

        console.info(eventDetails);

        // Llamada al servicio para crear el evento
        this.googleEventService.createGoogleEvent(eventDetails);
    } else {
      this.formulario.markAllAsTouched();
      alert('Por favor, completa todos los campos requeridos correctamente.');
        console.log("Formulario inválido", this.formulario.value, this.dataReservaToSend);
    }
}



  close(): void {
    this.dialogRef.close();
  }
}
