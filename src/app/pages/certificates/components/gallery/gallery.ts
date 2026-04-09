import { Component, Input } from '@angular/core';
import { Certificate } from '../../../../models/certificate';

@Component({
  selector: 'gallery',
  imports: [],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery {
  @Input() certificateList: Certificate[] = [];
  selectedCert: Certificate | null = null;
}
