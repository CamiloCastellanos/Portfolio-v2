import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
//Transloco
import { TranslocoPipe } from '@ngneat/transloco';
//GSAP
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
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
export class Certificates implements OnInit, OnDestroy {
  certificateList: Certificate[] = [];
  private ctx!: gsap.Context;

  constructor(
    private readonly certificateService: CertificateService,
    private readonly el: ElementRef
  ) { }

  ngOnInit(): void {
    this.certificateList = this.certificateService.certificateList;
  }

  // El título se anima desde el padre — los datos son síncronos
  // así que el DOM está listo en el siguiente frame
  ngAfterViewInit(): void {
    requestAnimationFrame(() => this.initHeaderAnimation());
  }

  private initHeaderAnimation(): void {
    this.ctx = gsap.context(() => {

      // ── Estado inicial ──────────────────────────────────────────
      gsap.set('[data-anim="cert-title"]', { opacity: 0, y: 28 });
      gsap.set('[data-anim="cert-title-line"]', { scaleX: 0, transformOrigin: 'left center' });

      // ── Título + línea ──────────────────────────────────────────
      const tlHeader = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: '[data-anim="cert-title"]',
          start: 'top 82%',
          toggleActions: 'play none none reset',
        },
      });

      tlHeader
        .to('[data-anim="cert-title"]', { opacity: 1, y: 0, duration: 0.75 })
        .to('[data-anim="cert-title-line"]', { scaleX: 1, duration: 0.5 }, '-=0.2');

    }, this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
