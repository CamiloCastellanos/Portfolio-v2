import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
//NgIcon
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapFiletypeDoc, bootstrapGithub, bootstrapLinkedin } from '@ng-icons/bootstrap-icons';
import { ionMail } from '@ng-icons/ionicons';
import { heroDocumentArrowDownSolid } from '@ng-icons/heroicons/solid';
//Transloco
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
//HotToast
import { HotToastService } from '@ngxpert/hot-toast';
import confetti from 'canvas-confetti';
//GSAP
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'profile',
  imports: [NgIcon, TranslocoPipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
  viewProviders: [provideIcons({
    bootstrapLinkedin, bootstrapFiletypeDoc, bootstrapGithub, ionMail, heroDocumentArrowDownSolid
  })]
})
export class Profile implements OnInit, AfterViewInit, OnDestroy {
  sizeIcon: string = "25";
  colorIcon: string = "var(--accent)";
  urlGit: string = 'https://github.com/CamiloCastellanos';
  urlLinkedin: string = 'https://www.linkedin.com/in/juan-camilo-castellanos-puentes-0b6376152/';
  email: string = "camilo.castellanos.puentes@gmail.com";
  urlCV: string = "https://drive.google.com/file/d/1iiOjGLteQNDpTcoNLteAJIJM5gcYWjq7/view?usp=drive_link";
  private readonly urlCVEn = "https://drive.google.com/file/d/1uA8rPnOOOQmZM9FJQgI1m5DXGEt_MpN5/view?usp=drive_link";
  private readonly urlCVEs = "https://drive.google.com/file/d/1iiOjGLteQNDpTcoNLteAJIJM5gcYWjq7/view?usp=drive_link";
  private messageToast: string = "Email copiado al portapapeles";
  private readonly MD_BREAKPOINT = 768;
  private ctx!: gsap.Context;
  private readonly card = '[data-anim="profile-card"]';
  private readonly avatar = '[data-anim="profile-avatar"]';
  private readonly info = '[data-anim="profile-info"]';
  private readonly social = '[data-anim="profile-social"]';

  constructor(
    private readonly transloco: TranslocoService,
    private readonly toast: HotToastService,
    private readonly el: ElementRef
  ) { }

  ngOnInit() {
    this.transloco.langChanges$.subscribe((lang) => {
      this.urlCV = lang === 'es' ? this.urlCVEs : this.urlCVEn;
      this.messageToast = lang === 'es' ? "Email copiado al portapapeles" : "Email copied to clipboard";
    });
  }

  ngAfterViewInit(): void {
    requestAnimationFrame(() => this.initAnimations());
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }

  copyMail() {
    navigator.clipboard.writeText(this.email);
    this.toast.success(this.messageToast, {
      duration: 2000,
      icon: "📋",
      dismissible: true
    });
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.3 } });
  }

  private initAnimations(): void {
    this.ctx = gsap.context(() => {
      if (this.isDesktop()) {
        this.desktopAnimations(gsap);
      } else {
        this.mobileAnimations(gsap);
      }
    }, this.el.nativeElement);
  }

  private desktopAnimations(gsap: any) {
    gsap.set(this.card, { opacity: 0, x: -24 });
    gsap.set(this.avatar, { opacity: 0, scale: 0.88 });
    gsap.set(this.info, { opacity: 0, y: 14 });
    gsap.set(this.social, { opacity: 0, y: 10 });

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      delay: 0.45,
    });

    tl.to(this.card, { opacity: 1, x: 0, duration: 0.7 })
      .to(this.avatar, { opacity: 1, scale: 1, duration: 0.6 }, '-=0.4')
      .to(this.info, { opacity: 1, y: 0, duration: 0.55 }, '-=0.3')
      .to(this.social, {
        opacity: 1, y: 0, duration: 0.45,
        onComplete: () => {
          gsap.set([this.card, this.avatar, this.info, this.social], { clearProps: 'transform,opacity' });
        }
      }, '-=0.2');
  }

  private mobileAnimations(gsap: any) {
    gsap.set(this.card, { opacity: 0, y: 36, scale: 0.97 });
    gsap.set(this.avatar, { opacity: 0, scale: 0.88 });
    gsap.set(this.info, { opacity: 0, y: 14 });
    gsap.set(this.social, { opacity: 0, y: 10 });

    ScrollTrigger.batch(this.card, {
      start: 'top 85%',
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1, y: 0, scale: 1,
          duration: 0.65, ease: 'power3.out',
        });

        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          delay: 0.2,
        });

        tl.to(this.avatar, { opacity: 1, scale: 1, duration: 0.6 })
          .to(this.info, { opacity: 1, y: 0, duration: 0.55 }, '-=0.25')
          .to(this.social, {
            opacity: 1, y: 0, duration: 0.45,
            onComplete: () => {
              gsap.set([this.card, this.avatar, this.info, this.social], { clearProps: 'transform,opacity' });
            }
          }, '-=0.2');
      },

      onLeaveBack: (batch) => {
        gsap.set(batch, { opacity: 0, y: 36, scale: 0.97 });
        gsap.set(this.avatar, { opacity: 0, scale: 0.88 });
        gsap.set(this.info, { opacity: 0, y: 14 });
        gsap.set(this.social, { opacity: 0, y: 10 });
      },


    });
  }

  private isDesktop(): boolean {
    return window.innerWidth >= this.MD_BREAKPOINT;
  }
}
