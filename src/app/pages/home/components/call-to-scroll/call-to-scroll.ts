import { Component } from '@angular/core';
// Transloco
import { TranslocoPipe } from '@ngneat/transloco';
//
import { ScrollService } from '../../../../shared/services/scroll-service';

@Component({
  selector: 'call-to-scroll',
  imports: [TranslocoPipe],
  templateUrl: './call-to-scroll.html',
  styleUrl: './call-to-scroll.css',
})
export class CallToScroll {
  constructor(private readonly scrollService: ScrollService) { }

  scrollNextSection() {
    this.scrollService.scrollTo('about-me');
  }
}
