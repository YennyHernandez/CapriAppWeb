import { inject } from "@angular/core"
import { FirebaseStorageService } from "../services/firebase-storage.service"

export const typePackages = [{
    id: "paqueteEnamorados",
    namePackage: "Enamorados",
    slogan: "¡Enamora con un plan romántico para 2 personas!",
    description: "paquete romantico",
    price: 190.000,
    imagenPackage: "",
    menu:[
      {
        producto: "Churrasco",
        price: 30.000
      },
      {
        producto: "pechuga",
        price: 27.000
      },
      {
        producto: "Lomo de cerdo",
        price: 27.000
      },
      {
        producto: "Hamburguesa de cordero",
        price: 15.000
      }
    ]
  },
  {
    id: "paqueteCelebracion",
    namePackage: "Celebración",
    slogan: "¡Disfruta de un picnic interactivo para 5 personas!",
    description: "paquete celebration",
    price: 210.000,
    imagenPackage: "",
    menu:[
      {
        producto: "Hamburgueda de res",
        price: 30.000
      },
      {
        producto: "Sanduche de pollo",
        price: 27.000
      }
    ]
  },
  {
    id: "paqueteDescanso",
    namePackage: "Descanso",
    slogan: "¡Relajate en medio de la naturaleza y cabritas!",
    description: "paquete descanso",
    price: 80.000,
    imagenPackage: "",
    menu:[
      {
        producto: "Churrasco",
        price: 30.000
      },
      {
        producto: "pechuga",
        price: 27.000
      },
      {
        producto: "Lomo de cerdo",
        price: 27.000
      },
      {
        producto: "Hamburguesa de cordero",
        price: 15.000
      },
      {
        producto: "Hamburgueda de res",
        price: 30.000
      },
      {
        producto: "Sanduche de pollo",
        price: 27.000
      },
    ]
  },]

export const colorPackages = ["Rojo", "Rosado", "Azul", "Variados"]
export const productosExtra = [{
  producto: "Globlos metalicos",
  price: 23.000,
},
{
  producto: "Globlos helio",
  price: 47.000,
},{
  producto: "Bombas",
  price: 10.000,
},{
  producto: "Copas-Vino",
  price: 38.000,
},{
  producto: "Arreglo floral",
  price: 50.000,
},{
  producto: "Banderines",
  price: 8.000,
}]