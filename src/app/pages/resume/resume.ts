import { Component, signal, OnDestroy, effect, ElementRef } from '@angular/core';
import { collectionData, Firestore, collection } from '@angular/fire/firestore';
//Transloco
import { TranslocoPipe } from '@ngneat/transloco';
//GSAP
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
//
import { Work } from '../../models/work';
import { TimeLine } from './components/time-line/time-line';
import { ToolsLanguages } from '../../shared/components/tools-languages/tools-languages';

@Component({
  selector: 'resume',
  imports: [TimeLine, TranslocoPipe, ToolsLanguages],
  templateUrl: './resume.html',
  styleUrl: './resume.css',
})
export class Resume implements OnDestroy {
  workList = signal<Work[]>([]);
  private ctx!: gsap.Context;

  constructor(
    private readonly firestore: Firestore,
    private readonly el: ElementRef
  ) {
    this.getWork();

    effect(() => {
      const list = this.workList();
      if (list.length > 0) {
        setTimeout(() => this.initAnimations(), 50);
      }
    });
  }

  private getWork() {
    collectionData(collection(this.firestore, 'trabajos')).subscribe((data: any) => {
      this.workList.set(data);
    });
  }

  private initAnimations(): void {
    this.ctx?.revert(); // limpia si se re-ejecuta

    this.ctx = gsap.context(() => {
      // ── Estado inicial ────────────────────────────────────────────
      gsap.set('[data-anim="resume-title"]', { opacity: 0, y: 28 });
      gsap.set('[data-anim="resume-title-line"]', { scaleX: 0, transformOrigin: 'left center' });
      gsap.set('[data-anim="timeline-item"]', { opacity: 0, x: -36 });
      gsap.set('[data-anim="tools-section"]', { opacity: 0, y: 32 });

      // ── Timeline: título + línea ───────────────────────────────────
      const tlHeader = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: '[data-anim="resume-title"]',
          start: 'top 82%',
          toggleActions: 'play none none reset',
        },
      });

      tlHeader
        .to('[data-anim="resume-title"]', { opacity: 1, y: 0, duration: 0.75 })
        .to('[data-anim="resume-title-line"]', { scaleX: 1, duration: 0.5 }, '-=0.2');

      // ── Timeline: items de la línea de tiempo (batch stagger) ──────
      const tlItems = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: '[data-anim="timeline-item"]',
          start: 'top 80%',
          toggleActions: 'play none none reset',
        },
      });

      tlItems.to('[data-anim="timeline-item"]', {
        opacity: 1,
        x: 0,
        duration: 0.65,
        stagger: 0.18,
      });

      // ── Tools section ─────────────────────────────────────────────
      const tlTools = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: '[data-anim="tools-section"]',
          start: 'top 85%',
          toggleActions: 'play none none reset',
        },
      });

      tlTools.to('[data-anim="tools-section"]', { opacity: 1, y: 0, duration: 0.75 });

    }, this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
