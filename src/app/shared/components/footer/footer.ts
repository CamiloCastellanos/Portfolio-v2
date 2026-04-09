import { Component } from '@angular/core';
//Transloco
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-footer',
  imports: [TranslocoPipe],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer { }
