import { Component } from '@angular/core';
//Transloco
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'about-me',
  imports: [TranslocoPipe],
  templateUrl: './about-me.html',
  styleUrl: './about-me.css',
})
export class AboutMe { }
