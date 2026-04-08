import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
// ng-icons
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroBriefcase, heroDocument, heroHome, heroMoon, heroSun, heroUser } from '@ng-icons/heroicons/outline';
// Transloco
import { TranslocoPipe } from '@ngneat/transloco';
//
import { ThemeService } from '../../services/theme-service';
import { ScrollService } from '../../services/scroll-service';
import { TranslationButton } from '../translation-button/translation-button';

@Component({
  selector: 'navbar',
  imports: [CommonModule, NgIcon, TranslationButton,TranslocoPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  viewProviders: [provideIcons({
    heroSun, heroMoon, heroHome, heroUser, heroDocument, heroBriefcase
  })]
})
export class Navbar {
  navItems = [
    { id: 'home', label: 'navbar.home', icon: 'heroHome' },
    { id: 'about-me', label: 'navbar.about', icon: 'heroUser' },
    { id: 'resume', label: 'navbar.resume', icon: 'heroDocument' },
    { id: 'projects', label: 'navbar.project', icon: 'heroBriefcase' }
  ];
  activeSection = 'home';
  isScrolled = false;
  language: string = "es";

  constructor(readonly themeService: ThemeService,
    private readonly scrollService: ScrollService) {
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
