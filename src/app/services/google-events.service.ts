import { Injectable } from '@angular/core';
import { rejects } from 'assert';
import { BehaviorSubject } from 'rxjs';
interface EventDetails {
  startTime: string;
  endTime: string;
  email: string;
}

declare var gapi: any;
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleEventService {
  private tokenClient: any;
  private API_KEY_G = process.env['ANGULAR_API_KEY_G']!;
  private DISCOVERY_DOC = process.env['ANGULAR_DISCOVERY_DOC']!;
  private CALENDAR_ID = process.env['ANGULAR_CALENDAR_ID']!;
  private CLIENT_ID = process.env['ANGULAR_CLIENT_ID']!;
  private SCOPES = process.env['ANGULAR_SCOPES']!;
  private stateUpdatedSource = new BehaviorSubject<boolean>(false); // Emite si se actualizó el estado de la reserva
  stateUpdated$ = this.stateUpdatedSource.asObservable();


  public loadGapi(): Promise<void> {
    return new Promise((resolve) => {
      gapi.load('client', async () => {
        console.log('gapi.client cargado, llamando a initializeGapiClient...');
        resolve(await this.initializeGapiClient());
      })
    });
  }

  private async initializeGapiClient(): Promise<void> {
    console.log('Entrando a initializeGapiClient...');
    return new Promise(async (resolve, reject) => {
      try {
        await gapi.client.init({
          apiKey: this.API_KEY_G,
          discoveryDocs: [this.DISCOVERY_DOC],
        });
        console.log('gapi.client ha sido inicializado exitosamente');
        // Llamar a loadGis solo después de que gapi esté inicializado
        this.loadGis();
        resolve();
      } catch (_) {
        reject('Error inicializando gapi.client:');
      }
    })

  }

  private loadGis() {
    this.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: this.CLIENT_ID,
      scope: this.SCOPES,
      callback: '', // definir callback más adelante
    });
    console.log('gis inicializado');
  }

  createGoogleEvent(booking: any) {
    const startTime = booking.appointmentDate?.toDate().toISOString(); // Convertir a formato ISO
    const endTime = booking.endAppointmentDate?.toDate().toISOString(); // Convertir a formato ISO
    const email = booking.email; 
    const eventDetails: EventDetails = {
      startTime: startTime,
      endTime: endTime,
      email: email,
    };
  
    this.tokenClient.callback = async (resp: any) => {
      if (resp.error !== undefined) {
        throw resp;
      }
      await this.scheduleEvent(eventDetails, booking);
    };
  
    if (gapi.client.getToken() === null) {
      this.tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      this.tokenClient.requestAccessToken({ prompt: '' });
    }
  }
  
  private async scheduleEvent(eventDetails: EventDetails, booking: any) {
    const event = {
      summary: `Reserva de ${booking.nombrePaqueteReservado}`, 
      location: 'Capripicnic, Vereda el Maco',
      description: `Reserva para ${booking.name} con ${booking.numberPersonasExtra} personas extra. Detalles: ${JSON.stringify(booking)}`, // Descripción del evento
      start: {
        dateTime: eventDetails.startTime,
        timeZone: 'America/Bogota',
      },
      end: {
        dateTime: eventDetails.endTime,
        timeZone: 'America/Bogota',
      },
      attendees: [{ email: eventDetails.email }], // email de quien reserva
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // Recordatorio por email 1 día antes
          { method: 'popup', minutes: 30 }, // Recordatorio emergente 30 minutos antes
        ],
      },
    };
  
    // API de Google Calendar para crear el evento
    try {
      const response = await gapi.client.calendar.events.insert({
        calendarId: this.CALENDAR_ID, 
        resource: event,
      });
      this.stateUpdatedSource.next(true);
    } catch (error) {
      console.error('Error creando el evento: ', error);
    }
  }
  

  async listGoogleEvents(): Promise<any[]> {
    try {
      console.log("entrando al try")
      const request = gapi.client.calendar.events.list({
        calendarId: this.CALENDAR_ID,
        timeMin: (new Date()).toISOString(),  // Obtiene eventos a partir de hoy
        showDeleted: false,
        singleEvents: true,
        maxResults: 50,  //cantidad de eventos a obtener
        orderBy: 'startTime'
      });

      const response = await new Promise<any[]>((resolve, reject) => {
        request.execute((response: any) => {
          if (response.error) {
            reject(response.error);
          } else {
            resolve(response.items);
          }
        });
      });
      console.log('El servicio está listando eventos');
      return response; // Retorna los eventos

    } catch (error) {
      console.error('Error al listar los eventos de Google Calendar:', error);
      throw error;
    }
  }

  async deleteGoogleEventByDate(startDateTime: string): Promise<void> {
    try {
      const eventos = await this.listGoogleEvents();
  
      // Buscar el evento que coincide con la fecha y hora exactas
      const eventoAEliminar = eventos.find(evento => evento.start.dateTime === startDateTime);
  
      if (eventoAEliminar) {
        await this.deleteGoogleEvent(eventoAEliminar.id);
        console.log(`Evento con fecha ${startDateTime} eliminado exitosamente.`);
      } else {
        console.log(`No se encontró un evento con fecha ${startDateTime}.`);
      }
    } catch (error) {
      console.error('Error al eliminar el evento por fecha:', error);
    }
  }
  
  async deleteGoogleEvent(eventId: string): Promise<void> {
    try {
      await gapi.client.calendar.events.delete({
        calendarId: this.CALENDAR_ID,
        eventId: eventId,
      });
      console.log(`Evento con ID ${eventId} eliminado exitosamente.`);
    } catch (error) {
      console.error('Error al eliminar el evento:', error);
      throw error;
    }
  }
  
  
  
}
