import { Component, signal, OnDestroy, effect, ElementRef } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
//Transloco
import { TranslocoPipe } from '@ngneat/transloco';
//GSAP
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
//
import { Project } from '../../models/project';
import { ToolsLanguages } from '../../shared/components/tools-languages/tools-languages';
import { Card } from './components/card/card';

@Component({
  selector: 'projects',
  imports: [TranslocoPipe, ToolsLanguages, Card],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnDestroy {
  projectList = signal<Project[]>([]);
  private ctx!: gsap.Context;

  constructor(
    private readonly firestore: Firestore,
    private readonly el: ElementRef
  ) {
    this.getProject();

    effect(() => {
      const list = this.projectList();
      if (list.length > 0) {
        // Espera que Angular termine el render del @for
        setTimeout(() => this.initAnimations(), 50);
      }
    });
  }

  private getProject() {
    collectionData(collection(this.firestore, 'proyectos')).subscribe((data: any) => {
      this.projectList.set(data);
    });
  }

  private initAnimations(): void {
    this.ctx?.revert();

    this.ctx = gsap.context(() => {

      // ── Estado inicial ────────────────────────────────────────────
      gsap.set('[data-anim="projects-title"]', { opacity: 0, y: 28 });
      gsap.set('[data-anim="projects-title-line"]', { scaleX: 0, transformOrigin: 'left center' });
      gsap.set('[data-anim="project-card"]', { opacity: 0, y: 40, scale: 0.96 });
      gsap.set('[data-anim="tools-section"]', { opacity: 0, y: 32 });

      // ── Título + línea ─────────────────────────────────────────────
      const tlHeader = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: '[data-anim="projects-title"]',
          start: 'top 82%',
          toggleActions: 'play none none reset',
        },
      });

      tlHeader
        .to('[data-anim="projects-title"]', { opacity: 1, y: 0, duration: 0.75 })
        .to('[data-anim="projects-title-line"]', { scaleX: 1, duration: 0.5 }, '-=0.2');

      // ── Cards en grid — stagger por filas ──────────────────────────

      ScrollTrigger.batch('[data-anim="project-card"]', {
        start: 'top 88%',
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: 'power3.out',
            stagger: 0.14,
            clearProps: 'transform,opacity',
          });
        },
        onLeaveBack: (batch) => {
          // Reset al salir hacia arriba — replay al volver a entrar
          gsap.set(batch, {
            opacity: 0,
            y: 40,
            scale: 0.96,
            clearProps: '',
          });
        },
      });
      // ── Tools section ─────────────────────────────────────────────
      ScrollTrigger.batch('[data-anim="tools-section"]', {
        start: 'top 88%',
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
            onComplete: () => {
              ScrollTrigger.refresh();
            }
          });
        },
        onLeaveBack: (batch) => {
          gsap.set(batch, { opacity: 0, y: 32 });
        },
      });

    }, this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
