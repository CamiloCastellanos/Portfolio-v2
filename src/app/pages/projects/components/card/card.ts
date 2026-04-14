import { Component, Input, signal } from '@angular/core';
import { NgClass } from '@angular/common';
//Transloco
import { TranslocoPipe } from '@ngneat/transloco';
// NgIcon
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapEye, bootstrapGit } from '@ng-icons/bootstrap-icons';
//
import { Project } from '../../../../models/project';
import { TranslateTextPipe } from '../../../../shared/pipe/translate-text-pipe-pipe';
import { ThemeService } from '../../../../shared/services/theme-service';

@Component({
  selector: 'card',
  imports: [TranslateTextPipe, TranslocoPipe, NgIcon, NgClass],
  templateUrl: './card.html',
  styleUrl: './card.css',
  viewProviders: [provideIcons({
    bootstrapGit, bootstrapEye
  })]
})
export class Card {
  @Input() projectList = signal<Project[]>([]);
  sizeIcon: string = "17";

  constructor(readonly themeService: ThemeService) { }
}
