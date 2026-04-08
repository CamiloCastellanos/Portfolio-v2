import { Component, computed, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
// Transloco
import { TranslocoService } from '@ngneat/transloco';
//
import { Work } from '../../../../models/work';
import { TranslateTextPipe } from '../../../../shared/pipe/translate-text-pipe-pipe';

@Component({
  selector: 'resume-time-line',
  imports: [CommonModule, TranslateTextPipe],
  templateUrl: './time-line.html',
  styleUrl: './time-line.css',
})
export class TimeLine {
  @Input() workList = signal<Work[]>([])
  textDescription: string = "Cargo 🧑🏼‍💻";
  sortedWorkList = computed(() =>
    [...this.workList()].sort((a, b) => b.order - a.order)
  );

  constructor(private readonly translate: TranslocoService) {
    this.translate.langChanges$.subscribe((lang: string) => {
      this.textDescription = lang == 'es' ? "Cargo 🧑🏼‍💻" : "Position 🧑🏼‍💻"
    });
  }
}
