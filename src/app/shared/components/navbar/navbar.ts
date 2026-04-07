import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
//
import { TranslocoService } from '@ngneat/transloco';
//
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroBriefcase, heroDocument, heroHome, heroMoon, heroSun, heroUser } from '@ng-icons/heroicons/outline';
//
import { ThemeService } from '../../services/theme-service';
import { ScrollService } from '../../services/scroll-service';
import { TranslationButton } from '../translation-button/translation-button';

@Component({
  selector: 'navbar',
  imports: [CommonModule, NgIcon, TranslationButton],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  viewProviders: [provideIcons({
    heroSun, heroMoon, heroHome, heroUser, heroDocument, heroBriefcase
  })]
})
export class Navbar {
  navItems = [
    { id: 'home', label: 'Home', icon: 'heroHome' },
    { id: 'about-me', label: 'About', icon: 'heroUser' },
    { id: 'resume', label: 'Resume', icon: 'heroDocument' },
    { id: 'projects', label: 'Projects', icon: 'heroBriefcase' }
  ];
  activeSection = 'home';
  isScrolled = false;
  language: string = "es";

  constructor(readonly themeService: ThemeService,
    private readonly scrollService: ScrollService,
    private transloco: TranslocoService) {
    this.scrollService.currentSection$.subscribe(section => {
      this.activeSection = section;
    });
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
