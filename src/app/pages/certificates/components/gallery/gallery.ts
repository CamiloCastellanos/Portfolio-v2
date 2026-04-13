import { AfterViewInit, Component, Input, OnDestroy, ElementRef } from '@angular/core';
//GLightbox
import GLightbox from 'glightbox';
//GSAP
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
//
import { Certificate } from '../../../../models/certificate';

@Component({
  selector: 'gallery',
  imports: [],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery implements AfterViewInit, OnDestroy {
  @Input() certificateList: Certificate[] = [];
  selectedCert: Certificate | null = null;
  private ctx!: gsap.Context;

  constructor(private readonly el: ElementRef) { }

  ngAfterViewInit() {
    setTimeout(() => {
      GLightbox({ selector: '.cert-lightbox' });
    });
    requestAnimationFrame(() => this.initAnimations());
  }

  private initAnimations(): void {
    this.ctx = gsap.context(() => {

      // ── Estado inicial ────────────────────────────────────────────
      gsap.set('[data-anim="cert-card"]', {
        opacity: 0,
        y: 36,
        scale: 0.97,
      });

      // ── Batch: trigger individual por card ────────────────────────
      // Funciona en 1 o 2 columnas — cada <a> reacciona cuando entra al viewport
      ScrollTrigger.batch('[data-anim="cert-card"]', {
        start: 'top 88%',

        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: 'power3.out',
            stagger: 0.13,
            // ⚠️ Libera estilos inline para no bloquear hover CSS
            // hover:-translate-y-1 y group-hover:scale-105 funcionan normalmente
            clearProps: 'transform,opacity',
          });
        },

        onLeaveBack: (batch) => {
          // Reset al salir por arriba — replay al volver a bajar
          gsap.set(batch, {
            opacity: 0,
            y: 36,
            scale: 0.97,
          });
        },
      });

    }, this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
