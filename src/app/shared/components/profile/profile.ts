import { Component, OnInit } from '@angular/core';
// ng-icons
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapFiletypeDoc, bootstrapGithub, bootstrapLinkedin } from '@ng-icons/bootstrap-icons';
import { ionMail } from '@ng-icons/ionicons';
import { heroDocumentArrowDownSolid } from '@ng-icons/heroicons/solid';
// Transloco
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'profile',
  imports: [NgIcon, TranslocoPipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
  viewProviders: [provideIcons({
    bootstrapLinkedin, bootstrapFiletypeDoc, bootstrapGithub, ionMail, heroDocumentArrowDownSolid
  })]
})
export class Profile implements OnInit {

  sizeIcon: string = "25";
  colorIcon: string = "var(--accent)";
  urlGit: string = 'https://github.com/CamiloCastellanos';
  urlLinkedin: string = 'https://www.linkedin.com/in/juan-camilo-castellanos-puentes-0b6376152/';
  email: string = "camilo.castellanos.puentes@gmail.com";
  urlCV: string = "https://drive.google.com/file/d/1iiOjGLteQNDpTcoNLteAJIJM5gcYWjq7/view?usp=drive_link";
  private readonly urlCVEn = "https://drive.google.com/file/d/1uA8rPnOOOQmZM9FJQgI1m5DXGEt_MpN5/view?usp=drive_link";
  private readonly urlCVEs = "https://drive.google.com/file/d/1iiOjGLteQNDpTcoNLteAJIJM5gcYWjq7/view?usp=drive_link";
  private messageToast: string = "Email copiado al portapapeles";

  constructor(private readonly transloco: TranslocoService, private readonly toast: HotToastService) { }

  ngOnInit() {
    this.transloco.langChanges$.subscribe((lang) => {
      this.urlCV = lang == 'es' ? this.urlCVEs : this.urlCVEn;
      this.messageToast = lang == 'es' ? "Email copiado al portapapeles" : "Email copied to clipboard";
    });
  }

  copyMail() {
    navigator.clipboard.writeText(this.email);
    this.toast.success(this.messageToast, {
      duration: 2000,
      icon: "📋",
      dismissible: true
    });
  }
}
