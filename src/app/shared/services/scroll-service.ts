import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  private currentSection = new BehaviorSubject<string>('home');
  currentSection$ = this.currentSection.asObservable();

  private observer!: IntersectionObserver;

  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const yOffset = sectionId == 'home' ? -40 : -80; // altura navbar
    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });

    this.currentSection.next(sectionId);
  }

  init(sectionIds: string[]) {
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter(el => el !== null) as HTMLElement[];

    this.createObserver();

    elements.forEach(section => {
      this.observer.observe(section);
    });
  }

  private createObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length > 0) {
          const current = visibleSections[0].target.id;
          this.currentSection.next(current);
        }
      },
      {
        root: null,
        threshold: [0.3, 0.6, 0.9],
      }
    );
  }
}
