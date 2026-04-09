import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  private readonly currentSection = new BehaviorSubject<string>('home');
  private readonly isMobile = window.innerWidth < 768;
  private observer!: IntersectionObserver;
  currentSection$ = this.currentSection.asObservable();

  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (!element) return;

    if (this.isMobile) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    } else {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

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
        let closestSection: IntersectionObserverEntry | null = null;
        let minDistance = Infinity;

        const viewportCenter = window.innerHeight / 2;

        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const rect = entry.boundingClientRect;
          const sectionCenter = rect.top + rect.height / 2;

          const distance = Math.abs(viewportCenter - sectionCenter);

          if (distance < minDistance) {
            minDistance = distance;
            closestSection = entry;
          }

          if (closestSection != null) {
            this.currentSection.next(closestSection.target.id);
          }
        });
      },
      {
        root: null,
        threshold: 0.1,
      }
    );
  }
}
