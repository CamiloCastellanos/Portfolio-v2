import { Component, OnInit } from '@angular/core';
// Transloco
import { TranslocoPipe } from '@ngneat/transloco';
//
import { Gallery } from './components/gallery/gallery';
import { Certificate } from '../../models/certificate';
import { CertificateService } from '../../shared/services/certificate-service';

@Component({
  selector: 'certificates',
  imports: [Gallery, TranslocoPipe],
  templateUrl: './certificates.html',
  styleUrl: './certificates.css',
})
export class Certificates implements OnInit {
  certificateList: Certificate[] = [];

  constructor(private readonly certificateService: CertificateService) { }

  ngOnInit(): void {
    this.certificateList = this.certificateService.certificateList;
  }
}
