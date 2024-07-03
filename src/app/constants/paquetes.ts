import { MediaLiteralsObject, Packag , ProductPrice} from "../interfaces/media-storage.interface"
export const typePackages: Packag[]  = [{
    id: "paqueteEnamorados",
    namePackage: "Enamorados",
    slogan: "¡Enamora con un plan romántico para 2 personas!",
    description: "Nuestro Paquete romantico incluye menu, decoración con fotos y mensaje especial en tablero tiza, luces y antorchas en todo el lugar, fogata y malvaviscos. ",
    price: 190.000,
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
    ],
    mediaType: 'image', 
    urlDescarga: 'generic/paquete_enamorados.jpg',
    itemsUrlDescarga: [
      "penamorados/penamorados1.jpg",
       "penamorados/penamorados2.jpg",
       "penamorados/penamorados3.jpg",
       "penamorados/penamorados4.jpg",
       "penamorados/penamorados5.jpg",
       "penamorados/penamorados6.jpg",
       "penamorados/penamorados7.jpg",
  ],
  
  },
  {
    id: "paqueteCelebracion",
    namePackage: "Celebración",
    slogan: "¡Disfruta de un picnic interactivo para 5 personas!",
    description: "Nuestro paquete celebración incluye menú, decoración según la ocasión con globos en el teppe y mensaje especial en el tablero tiza." ,
    price: 210.000,
    menu:[
      {
        producto: "Hamburgueda de res",
        price: 30.000
      },
      {
        producto: "Sanduche de pollo",
        price: 27.000
      }
    ],  
    mediaType: 'image',
    urlDescarga: 'generic/paquete_celebracion.jpg', 
    itemsUrlDescarga: [
     "pcelebracion/pcelebracion1.jpg",
      "pcelebracion/pcelebracion2.jpg",
    "pcelebracion/pcelebracion3.jpg",
      "pcelebracion/pcelebracion4.jpg",
      "pcelebracion/pcelebracion5.jpg",
       "pcelebracion/pcelebracion6.jpg",
     "pcelebracion/pcelebracion7.jpg",
  ],
  },
  {
    id: "paqueteDescanso",
    namePackage: "Descanso",
    slogan: "¡Relajate en medio de la naturaleza y cabritas!",
    description: "Nuestro paquete descanso es el plan perfecto para relajarse, incluye tela picnic, cogines de descanso y juegos de mesa",
    price: 80.000,
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
    ],
    mediaType: 'image', 
    urlDescarga: 'generic/paquete_interaccion.png', 
    itemsUrlDescarga: [
       "pdescanso/pdescanso1.jpg",
       "pdescanso/pdescanso2.jpg",
       "pdescanso/pdescanso3.jpg",
       "pdescanso/pdescanso4.jpg",
       "pdescanso/pdescanso5.jpg",
       "pdescanso/pdescanso6.jpg",
       "pdescanso/pdescanso7.jpg",
   
  ],
  }]

export const  media: MediaLiteralsObject = {
  ordeño: { mediaType: 'image', urlDescarga: 'generic/ordeno.JPG', url: '' },
  velada: { mediaType: 'image', urlDescarga: 'generic/velada.jpg', url: '' },
  atardecer: { mediaType: 'image', urlDescarga: 'generic/atardeceres.JPG', url: '' },
  fogata: { mediaType: 'image', urlDescarga: 'generic/fogata.png', url: '' },
  comida: { mediaType: 'image', urlDescarga: 'generic/comida.jpg', url: '' },
  alimentar: { mediaType: 'image', urlDescarga: 'generic/alimentar.jpg', url: '' },
  aventura: { mediaType: 'video', urlDescarga: 'generic/video_aventura.mov', url: '' },
  banner: { mediaType: 'image', urlDescarga: 'generic/banner.png', url: '' },
  logocapri: { mediaType: 'image', urlDescarga: 'generic/logocapri.png', url: '' },
};

export const colorPackages : string[] = ["Rojo", "Rosado", "Azul", "Variados"]
export const bebidas : ProductPrice[] = [{
  producto: "Limonada natural",
  price: 4.000,
},
{
  producto: "Cerezada",
  price: 6.000,
},{
  producto: "Panelada",
  price: 4.000,
}]

export const productosExtra : ProductPrice[]= [{
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