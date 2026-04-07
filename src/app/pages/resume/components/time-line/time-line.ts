import { Component, computed, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
//
import { Work } from '../../../../models/work';
import { TranslateTextPipe } from '../../../../shared/pipe/translate-text-pipe-pipe';

@Component({
  selector: 'resume-time-line',
  imports: [CommonModule,TranslateTextPipe],
  templateUrl: './time-line.html',
  styleUrl: './time-line.css',
})
export class TimeLine {
  @Input() workList = signal<Work[]>([])
  @Input() textDescription: string = "Cargo 🧑🏼‍💻";
  sortedWorkList = computed(() =>
    [...this.workList()].sort((a, b) => b.order - a.order)
  );
}
