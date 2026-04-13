import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
//NgIcon
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapDownload, bootstrapFolder } from '@ng-icons/bootstrap-icons';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
//GSAP
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
//
import { CallToScroll } from './components/call-to-scroll/call-to-scroll';
import { ScrollService } from '../../shared/services/scroll-service';

@Component({
  selector: 'home',
  imports: [NgIcon, CallToScroll, TranslocoPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
  viewProviders: [provideIcons({ bootstrapDownload, bootstrapFolder })]
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  sizeIcon: string = "15";
  urlCV: string = "https://drive.google.com/file/d/1iiOjGLteQNDpTcoNLteAJIJM5gcYWjq7/view?usp=drive_link";
  private readonly urlCVEn = "https://drive.google.com/file/d/1uA8rPnOOOQmZM9FJQgI1m5DXGEt_MpN5/view?usp=drive_link";
  private readonly urlCVEs = "https://drive.google.com/file/d/1iiOjGLteQNDpTcoNLteAJIJM5gcYWjq7/view?usp=drive_link";
  private ctx!: gsap.Context;

  constructor(
    private readonly transloco: TranslocoService,
    private readonly scrollService: ScrollService,
    private readonly el: ElementRef
  ) { }

  ngOnInit() {
    this.transloco.langChanges$.subscribe((lang) => {
      this.urlCV = lang === 'es' ? this.urlCVEs : this.urlCVEn;
    });
  }

  ngAfterViewInit(): void {
    requestAnimationFrame(() => this.initAnimations());
  }

  private initAnimations(): void {
    this.ctx = gsap.context(() => {

      // ── Estado inicial ──────────────────────────────────────────
      gsap.set('[data-anim="home-greeting"]', { opacity: 0, y: 20 });
      gsap.set('[data-anim="home-name"]', { opacity: 0, y: 28 });
      gsap.set('[data-anim="home-position"]', { opacity: 0, y: 20, skewX: -4 });
      gsap.set('[data-anim="home-text"]', { opacity: 0, y: 18 });
      gsap.set('[data-anim="home-buttons"]', { opacity: 0, y: 16 });
      gsap.set('[data-anim="home-cta"]', { opacity: 0 });


      gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 })
        .to('[data-anim="home-greeting"]', { opacity: 1, y: 0, duration: 0.6 })
        .to('[data-anim="home-name"]', { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
        .to('[data-anim="home-position"]', { opacity: 1, y: 0, skewX: 0, duration: 0.6 }, '-=0.35')
        .to('[data-anim="home-text"]', { opacity: 1, y: 0, duration: 0.55 }, '-=0.2')
        .to('[data-anim="home-buttons"]', { opacity: 1, y: 0, duration: 0.5 }, '-=0.15')
        .to('[data-anim="home-cta"]', { opacity: 1, duration: 0.5 }, '-=0.05');

    }, this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }

  scrollToProjects() {
    this.scrollService.scrollTo('projects');
  }
}
