import { Component } from '@angular/core';
// ng-icons
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapFiletypeDoc, bootstrapGithub, bootstrapLinkedin } from '@ng-icons/bootstrap-icons';
import { ionMail } from '@ng-icons/ionicons';
import { heroDocumentArrowDownSolid } from '@ng-icons/heroicons/solid';
// Transloco
import { TranslocoPipe } from '@ngneat/transloco';


@Component({
  selector: 'profile',
  imports: [NgIcon, TranslocoPipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
  viewProviders: [provideIcons({
    bootstrapLinkedin, bootstrapFiletypeDoc, bootstrapGithub, ionMail, heroDocumentArrowDownSolid
  })]
})
export class Profile {

  sizeIcon: string = "25";
  colorIcon: string = "var(--accent)";
  urlGit: string = 'https://github.com/CamiloCastellanos';
  urlLinkedin: string = 'https://www.linkedin.com/in/juan-camilo-castellanos-puentes-0b6376152/';
  email: string = "camilo.castellanos.puentes@gmail.com";
  urlCV: string = "https://drive.google.com/file/d/1iiOjGLteQNDpTcoNLteAJIJM5gcYWjq7/view?usp=drive_link";
  curriculumVitaeEn = "https://drive.google.com/file/d/1uA8rPnOOOQmZM9FJQgI1m5DXGEt_MpN5/view?usp=drive_link";
  curriculumVitaeEs = "https://drive.google.com/file/d/1iiOjGLteQNDpTcoNLteAJIJM5gcYWjq7/view?usp=drive_link";

  copyMail() {

  }
}
