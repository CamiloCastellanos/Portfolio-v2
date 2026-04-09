import { AfterViewInit, Component } from '@angular/core';
//
import { Home } from '../../../pages/home/home';
import { Projects } from '../../../pages/projects/projects';
import { AboutMe } from '../../../pages/about-me/about-me';
import { Resume } from '../../../pages/resume/resume';
import { ScrollService } from '../../services/scroll-service';
import { Certificates } from '../../../pages/certificates/certificates';

@Component({
  selector: 'sections',
  imports: [Home, Projects, AboutMe, Resume, Certificates],
  templateUrl: './sections.html',
  styleUrl: './sections.css',
})
export class Sections implements AfterViewInit {

  constructor(private readonly scrollService: ScrollService) { }

  ngAfterViewInit() {
    this.scrollService.init([
      'home',
      'about-me',
      'resume',
      'projects',
      'certificates'
    ]);
  }
}
