export type Paquetes = 'paqueteEnamorados' |'paqueteCelebracion' | 'paqueteDescanso';
export type x = Record<Paquetes, MediaPaquetes>
export interface MediaPaquetesLiteralsObject extends x{
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
