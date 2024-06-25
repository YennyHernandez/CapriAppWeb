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

 
   export interface PackageArray {
    id: string;
    namePackage: string;
    slogan: string;
    description: string;
    price: number;
    menu: MenuItem[];
    mediaType: string;
    urlDescarga: string;
    url: string;
  }
  export interface MenuItem {
    producto: string;
    price: number;
  }
