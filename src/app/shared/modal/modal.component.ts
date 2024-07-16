import { Component, ViewChild, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { typePackages, colorPackages, productosExtra, bebidas } from '../../constants/paquetes'; // Asegúrate de importar typePackages desde la ubicación correcta
import { Packag, ProductPrice } from 'src/app/interfaces/media-storage.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { _ViewRepeaterOperation } from '@angular/cdk/collections';
import { GoogleEventService } from '../../services/google-events.service'
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
  dataReservaToSend: any;
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
      appointmentTime: ['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      /* name:['', Validators.required],
      phone:[''],
      transferNumber:['', Validators.required], */
      numberPersonasExtra: [0],
      precioCotizadoPaquete:[0],  //crea control simple 
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
    } else {
        console.log("Formulario inválido");
    }


    let appointmentTime = new Date(this.formulario.value.appointmentTime);
    // Convert the date to the desired format with a custom offset (e.g., -07:00)
    const startTime = appointmentTime.toISOString().slice(0, 18) + '-07:00';
    const endTime = this.getEndTime(appointmentTime);
    const eventDetails = {
      email: this.formulario.value.email,
      startTime: startTime,
      endTime: endTime,
    };
    console.info(eventDetails);
    this.googleEventService.createGoogleEvent(eventDetails);
}

getEndTime(appointmentTime: Date) {
  // Add one hour to the date
  appointmentTime.setHours(appointmentTime.getHours() + 1);
  const endTime = appointmentTime.toISOString().slice(0, 18) + '-07:00';
  return endTime;
}

generateICSFile() {
  const datetimeValue = this.formulario.value.appointmentTime;
  const date = new Date(datetimeValue);
  const endTime = new Date(date);
  endTime.setHours(endTime.getHours() + 1);
  // Format dates to be in the proper format for the .ics file
  const formattedStartDate = date
    .toISOString()
    .replace(/-/g, '')
    .replace(/:/g, '')
    .slice(0, -5);
  const formattedEndDate = endTime
    .toISOString()
    .replace(/-/g, '')
    .replace(/:/g, '')
    .slice(0, -5);
  // Event details
  const eventName = 'Sample Event';
  const eventDescription = 'This is a sample event';
  const location = 'Sample Location';
  // Create the .ics content
  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTAMP:${formattedStartDate}Z
DTSTART:${formattedStartDate}Z
DTEND:${formattedEndDate}Z
SUMMARY:${eventName}
DESCRIPTION:${eventDescription}
LOCATION:${location}
END:VEVENT
END:VCALENDAR`;
  // Create a Blob containing the .ics content
  const blob = new Blob([icsContent], {
    type: 'text/calendar;charset=utf-8',
  });
  // Create a download link for the Blob
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = 'event.ics';
  // Trigger the download
  downloadLink.click();
}
  close(): void {
    this.dialogRef.close();
  }
}
