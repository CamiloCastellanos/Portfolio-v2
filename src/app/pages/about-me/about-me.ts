import { Component, OnInit, OnDestroy } from '@angular/core';
//Transloco
import { TranslocoPipe } from '@ngneat/transloco';
//GSAP
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
//
import { Profile } from '../../shared/components/profile/profile';

@Component({
  selector: 'about-me',
  imports: [TranslocoPipe, Profile],
  templateUrl: './about-me.html',
  styleUrl: './about-me.css',
})
export class AboutMe implements OnInit, OnDestroy {
  private ctx!: gsap.Context;

  ngOnInit(): void {
    requestAnimationFrame(() => this.initAnimations());
  }

  private initAnimations(): void {
    this.ctx = gsap.context(() => {
      gsap.set('[data-anim="title"]', { opacity: 0, y: 30 });
      gsap.set('[data-anim="title-line"]', { scaleX: 0, transformOrigin: 'left center' });
      gsap.set('[data-anim="paragraph"]', { opacity: 0, y: 24 });
      gsap.set('[data-anim="card"]', { opacity: 0, x: 40, y: 16 });
      gsap.set('[data-anim="quote"]', { opacity: 0, x: -20 });
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: 'about-me',   // el componente host
          start: 'top 80%',      // entra cuando el top del bloque llega al 80% del viewport
          end: 'top 20%',        // sale cuando el top supera el 20% (scroll hacia arriba)
          toggleActions: 'play none none reset',
        },
      });

      // 1. Título + línea
      tl.to('[data-anim="title"]', { opacity: 1, y: 0, duration: 0.55 })
        .to('[data-anim="title-line"]', { scaleX: 1, duration: 0.4 }, '-=0.2');

      // 2. Párrafos en cascada
      tl.to('[data-anim="paragraph"]', {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.12,
      }, '-=0.1');

      // 3. Cards y quote (columna derecha + quote final)
      tl.to('[data-anim="card"]', {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.55,
        stagger: 0.14,
      }, '-=0.3');

      tl.to('[data-anim="quote"]', {
        opacity: 1,
        x: 0,
        duration: 0.5,
      }, '-=0.1');

    });
  }

  ngOnDestroy(): void {
    this.ctx?.revert(); // limpia todos los tweens y ScrollTriggers
  }
}
