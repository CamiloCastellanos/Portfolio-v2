import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'translation-button',
  imports: [CommonModule],
  templateUrl: './translation-button.html',
  styleUrl: './translation-button.css',
})
export class TranslationButton implements OnInit {
  language: string = "es";
  image: string = "../../../../assets/image/lang/es.svg";

  constructor(private transloco: TranslocoService) { }

  ngOnInit() {
    this.transloco.langChanges$.subscribe((lang) => {
      this.language = lang;
      this.image = this.language == 'es' ? "../../../../assets/image/lang/es.svg" : "../../../../assets/image/lang/en.svg";
    });
  }

  changeLang() {
    this.language = this.language == 'es' ? 'en' : 'es';
    this.image = this.language == 'es' ? "../../../../assets/image/lang/es.svg" : "../../../../assets/image/lang/en.svg";
    this.transloco.setActiveLang(this.language);
  }
}
