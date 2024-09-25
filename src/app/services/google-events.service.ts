import { Injectable } from '@angular/core';

declare var gapi: any;
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleEventService {
  private tokenClient: any;
  private gapiInited = false;
  private gisInited = false;

  private API_KEY_G = process.env['ANGULAR_API_KEY_G']!;
  private DISCOVERY_DOC = process.env['ANGULAR_DISCOVERY_DOC']!;
  private CALENDAR_ID = process.env['ANGULAR_CALENDAR_ID']!;
  private CLIENT_ID = process.env['ANGULAR_CLIENT_ID']!;
  private SCOPES = process.env['ANGULAR_SCOPES']!;

  constructor() {
    this.loadGapi();
    this.loadGis();
  }

  private loadGapi() {
    gapi.load("client", () => this.initializeGapiClient());
  }

  private async initializeGapiClient() {
    await gapi.client.init({
      apiKey: this.API_KEY_G,
      discoveryDocs: [this.DISCOVERY_DOC],
    });
    this.gapiInited = true;
  }

  private loadGis() {
    this.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: this.CLIENT_ID,
      scope: this.SCOPES,
      callback: "", // definir callback más adelante
    });
    this.gisInited = true;
  }

  createGoogleEvent(eventDetails: { startTime: string; endTime: string; email: string }) {
    this.tokenClient.callback = async (resp: any) => {
      if (resp.error !== undefined) {
        throw resp;
      }
      await this.scheduleEvent(eventDetails);
    };
    if (gapi.client.getToken() === null) {
      this.tokenClient.requestAccessToken({ prompt: "consent" });
    } else {
      this.tokenClient.requestAccessToken({ prompt: "" });
    }
  }

  private async scheduleEvent(eventDetails: { startTime: string; endTime: string; email: string }) {
    const event = {
      summary: "Google I/O 2015",
      location: "800 Howard St., San Francisco, CA 94103",
      description: "A chance to hear more about Google's developer products.",
      start: {
        dateTime: eventDetails.startTime,
        timeZone: "America/Bogota",
      },
      end: {
        dateTime: eventDetails.endTime,
        timeZone:  "America/Bogota",
      },
      attendees: [{ email: eventDetails.email }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 10 },
        ],
      },
    };

    const request = gapi.client.calendar.events.insert({
      calendarId: this.CALENDAR_ID,
      resource: event,
    });

    request.execute((event: any) => {
      console.info("Event created: " + event.htmlLink);
    });
  }

  async listGoogleEvents() {
    try {
      const request = gapi.client.calendar.events.list({
        calendarId: this.CALENDAR_ID,
        timeMin: (new Date()).toISOString(),  // Obtiene eventos a partir de hoy
        showDeleted: false,
        singleEvents: true,
        maxResults: 50,  // Limita la cantidad de eventos a obtener
        orderBy: 'startTime'
      });
  
      const response = await new Promise((resolve, reject) => {
        request.execute((response: any) => {
          if (response.error) {
            reject(response.error);
          } else {
            resolve(response.items);
          }
        });
      });
  
      return response; // Retorna los eventos
    } catch (error) {
      console.error("Error al listar los eventos de Google Calendar:", error);
      throw error; // Re-lanzar el error para que pueda ser manejado por el llamador
    }
  }
  
}
