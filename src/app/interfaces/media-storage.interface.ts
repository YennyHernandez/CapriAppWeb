export interface MediaLiteralsObject{
    ordeño: MediaPaquetes;
    velada: MediaPaquetes;
    atardecer: MediaPaquetes;
    fogata: MediaPaquetes;
    comida: MediaPaquetes;
    alimentar: MediaPaquetes;
    aventura: MediaPaquetes;
    banner: MediaPaquetes;
    logocapri: MediaPaquetes
  }
  
 export interface MediaPaquetes {
    mediaType: 'image' | 'video';
    urlDescarga: string;
    url: string;
  }

 
  export interface Packag {
    id: string;
    namePackage: string;
    slogan: string;
    description: string;
    price: number;
    pricePersonExtra: number;
    menu: ProductPrice[];
    mediaType: string;
    urlDescarga: string;
    itemsUrlDescarga: string[];
  }
  
  export interface PackageUrl extends Packag {
    url: string;
    urlsCarousel: string[];
  }
  export interface ProductPrice {
    producto: string;
    price: number;
  }

 
