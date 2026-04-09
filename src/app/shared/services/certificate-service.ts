import { Injectable } from '@angular/core';
import { Certificate } from '../../models/certificate';
import certificatesJSON from '../../../assets/json/certificates.json'

@Injectable({
  providedIn: 'root',
})
export class CertificateService {
  certificateList: Certificate[] = [];

  constructor() {
    this.getCertificates();
  }

  getCertificates() {
    this.certificateList = certificatesJSON.certificates.map((certificate: any) => {
      const { title, image } = certificate;
      return {
        title,
        image,
      } as Certificate;
    })
  }

}
