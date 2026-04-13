import { Component, HostListener, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
//NgIcon
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroAcademicCap, heroBriefcase, heroClipboard, heroHome, heroMoon, heroSun, heroUser } from '@ng-icons/heroicons/outline';
//Transloco
import { TranslocoPipe } from '@ngneat/transloco';
//GSAP
import { gsap } from 'gsap';
///
import { ThemeService } from '../../services/theme-service';
import { ScrollService } from '../../services/scroll-service';
import { TranslationButton } from '../translation-button/translation-button';

@Component({
  selector: 'navbar',
  imports: [CommonModule, NgIcon, TranslationButton, TranslocoPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  viewProviders: [provideIcons({
    heroSun, heroMoon, heroHome, heroUser, heroBriefcase, heroAcademicCap, heroClipboard
  })]
})
export class Navbar implements AfterViewInit, OnDestroy {
  navItems = [
    { id: 'home', label: 'navbar.home', icon: 'heroHome' },
    { id: 'about-me', label: 'navbar.about', icon: 'heroUser' },
    { id: 'resume', label: 'navbar.resume', icon: 'heroBriefcase' },
    { id: 'projects', label: 'navbar.project', icon: 'heroClipboard' },
    { id: 'certificates', label: 'navbar.certificate', icon: 'heroAcademicCap' },
  ];
  activeSection = 'home';
  isScrolled = false;
  language: string = 'es';
  private ctx!: gsap.Context;

  constructor(
    readonly themeService: ThemeService,
    private readonly scrollService: ScrollService,
    private readonly el: ElementRef
  ) {
    this.scrollService.currentSection$.subscribe(section => {
      this.activeSection = section;
    });
  }

  ngAfterViewInit(): void {
    requestAnimationFrame(() => this.initAnimations());
  }

  private initAnimations(): void {
    this.ctx = gsap.context(() => {

      // Desktop navbar — entra desde arriba
      gsap.set('[data-anim="navbar-desktop"]', { opacity: 0, y: -24 });

      // Mobile navbar — entra desde abajo
      gsap.set('[data-anim="navbar-mobile"]', { opacity: 0, y: 24 });

      // Desktop
      gsap.to('[data-anim="navbar-desktop"]', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        // Sincronizado con el hero — entra cuando el greeting ya está visible
        delay: 0.45,
        clearProps: 'transform,opacity',
      });

      // Mobile — mismo delay, dirección opuesta
      gsap.to('[data-anim="navbar-mobile"]', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.45,
        clearProps: 'transform,opacity',
      });

    }, this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }

  goToSection(section: string) {
    this.scrollService.scrollTo(section);
  }

  toggle() {
    this.themeService.toggle();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 20;
  }
}
