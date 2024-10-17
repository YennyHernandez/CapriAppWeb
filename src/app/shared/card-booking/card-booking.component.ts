import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-booking',
  templateUrl: './card-booking.component.html',
  styleUrls: ['./card-booking.component.scss']
})
export class CardBookingComponent {
  @Input() booking: any;
  
  get description(): string {
    const trueProperties = Object.keys(this.booking).filter(key => typeof this.booking[key] === 'boolean' && this.booking[key]);
    return trueProperties.length > 0 ? trueProperties.join(', ') : 'Ninguna característica especial';
  }
}
