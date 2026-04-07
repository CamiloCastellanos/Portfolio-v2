import { Component } from '@angular/core';
//
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapDownload, bootstrapFolder } from '@ng-icons/bootstrap-icons';
//
import { CallToScroll } from './components/call-to-scroll/call-to-scroll';
import { ScrollService } from '../../shared/services/scroll-service';

@Component({
  selector: 'home',
  imports: [NgIcon, CallToScroll],
  templateUrl: './home.html',
  styleUrl: './home.css',
  viewProviders: [provideIcons({
    bootstrapDownload, bootstrapFolder
  })]
})
export class Home {
  sizeIcon: string = "15";
  urlCV: string = "https://drive.google.com/file/d/1iiOjGLteQNDpTcoNLteAJIJM5gcYWjq7/view?usp=drive_link";
  curriculumVitaeEn = "https://drive.google.com/file/d/1uA8rPnOOOQmZM9FJQgI1m5DXGEt_MpN5/view?usp=drive_link";
  curriculumVitaeEs = "https://drive.google.com/file/d/1iiOjGLteQNDpTcoNLteAJIJM5gcYWjq7/view?usp=drive_link";

  constructor(private readonly scrollService: ScrollService) { }

  scrollToProjects() {
    this.scrollService.scrollTo('projects');
  }

}
