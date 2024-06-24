import { Component } from '@angular/core';

@Component({
  selector: 'app-bookins',
  templateUrl: './bookins.component.html',
  styleUrls: ['./bookins.component.scss']
})

export class BookinsComponent {
  typePackages = [{
    namePackage: "Enamorados",
    description: "paquete romantico",
    price: 190.000,
  },
  {
    namePackage: "Celebración",
    description: "paquete celebration",
    price: 210.000,
  },
  {
    namePackage: "Descanso",
    description: "paquete descanso",
    price: 80.000,
  },]
}
