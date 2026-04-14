import { Component, Input, OnInit, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
//Transloco
import { TranslocoPipe } from '@ngneat/transloco';
//GSAP
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
//
import { ToolsLanguageservice } from '../../services/tools-languageservice';
import { ToolLanguage } from '../../../models/toolLanguage';
import { ThemeService } from '../../services/theme-service';

@Component({
  selector: 'tools-languages',
  imports: [TranslocoPipe, CommonModule],
  templateUrl: './tools-languages.html',
  styleUrl: './tools-languages.css',
})
export class ToolsLanguages implements OnInit, AfterViewInit, OnDestroy {
  @Input() stateDefault: number = -1;
  @Input() state: number = -1;
  @Input() aditionalText: string = "";
  toolList: ToolLanguage[] = [];
  private ctx!: gsap.Context;

  constructor(
    private readonly toolsLanguageservice: ToolsLanguageservice,
    private readonly el: ElementRef,
    readonly themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.toolList = this.toolsLanguageservice.getListFilter(this.state, this.stateDefault);
  }

  ngAfterViewInit(): void {
    requestAnimationFrame(() => this.initAnimations());
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }

  private initAnimations(): void {
    this.ctx = gsap.context(() => {
      // ── Estado inicial ──────────────────────────────────────────
      gsap.set('[data-anim="tools-title"]', { opacity: 0, y: 20 });
      gsap.set('[data-anim="tools-title-line"]', { scaleX: 0, transformOrigin: 'left center' });
      gsap.set('[data-anim="tool-item"]', { opacity: 0, y: 24, scale: 0.95 });

      // ── Título + línea ──────────────────────────────────────────
      const tlHeader = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: '[data-anim="tools-title"]',
          start: 'top 85%',
          toggleActions: 'play none none reset',
        },
      });

      tlHeader
        .to('[data-anim="tools-title"]', { opacity: 1, y: 0, duration: 0.65 })
        .to('[data-anim="tools-title-line"]', { scaleX: 1, duration: 0.4 }, '-=0.2');

      // ── Items ──────────────────────────────────────────
      ScrollTrigger.batch('[data-anim="tool-item"]', {
        start: 'top 95%',
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: 'power3.out',
            stagger: 0.08,
            clearProps: 'transform,opacity',
          });
        },
        onLeaveBack: (batch) => {
          gsap.set(batch, { opacity: 0, y: 24, scale: 0.95 });
        },
      });

    }, this.el.nativeElement);
  }
}
