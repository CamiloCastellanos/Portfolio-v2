import { Component, OnInit } from '@angular/core';
//
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapDownload, bootstrapFolder } from '@ng-icons/bootstrap-icons';
// Transloco
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
//
import { CallToScroll } from './components/call-to-scroll/call-to-scroll';
import { ScrollService } from '../../shared/services/scroll-service';

@Component({
  selector: 'home',
  imports: [NgIcon, CallToScroll, TranslocoPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
  viewProviders: [provideIcons({
    bootstrapDownload, bootstrapFolder
  })]
})
export class Home implements OnInit {
  sizeIcon: string = "15";
  urlCV: string = "https://drive.google.com/file/d/1iiOjGLteQNDpTcoNLteAJIJM5gcYWjq7/view?usp=drive_link";
  private readonly urlCVEn = "https://drive.google.com/file/d/1uA8rPnOOOQmZM9FJQgI1m5DXGEt_MpN5/view?usp=drive_link";
  private readonly urlCVEs = "https://drive.google.com/file/d/1iiOjGLteQNDpTcoNLteAJIJM5gcYWjq7/view?usp=drive_link";

  constructor(private readonly transloco: TranslocoService, private readonly scrollService: ScrollService) { }

  ngOnInit() {
    this.transloco.langChanges$.subscribe((lang) => {
      this.urlCV = lang == 'es' ? this.urlCVEs : this.urlCVEn;
    });
  }

  scrollToProjects() {
    this.scrollService.scrollTo('projects');
  }

}
