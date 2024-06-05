export interface MediaPaquetesLiteralsObject {
    paqueteEnamorados: MediaPaquetes;
    paqueteCelebracion: MediaPaquetes;
    paqueteDescanso: MediaPaquetes;
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