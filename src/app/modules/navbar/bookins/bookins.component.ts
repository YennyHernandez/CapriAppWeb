import { Component, AfterViewInit  } from '@angular/core';
import {typePackages} from "../../../constants/paquetes";
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-bookins',
  templateUrl: './bookins.component.html',
  styleUrls: ['./bookins.component.scss']
})

export class BookinsComponent implements AfterViewInit {
  typePackages = typePackages;
  constructor(private route: ActivatedRoute, private viewportScroller: ViewportScroller) {}
  ngAfterViewInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        // Scroll to the anchor first
        this.viewportScroller.scrollToAnchor(fragment);

        // Add additional offset after a short delay
        setTimeout(() => {
          const yOffset = -120; // Adjust this value according to the height of your fixed header
          const element = document.getElementById(fragment);
          if (element) {
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 50); // Adjust the delay as needed
      }
    });
  }
}
