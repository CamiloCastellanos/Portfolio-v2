import { Component } from '@angular/core';
//Transloco
import { TranslocoPipe } from '@ngneat/transloco';
//
import { Profile } from '../../shared/components/profile/profile';

@Component({
  selector: 'about-me',
  imports: [TranslocoPipe, Profile],
  templateUrl: './about-me.html',
  styleUrl: './about-me.css',
})
export class AboutMe { }
