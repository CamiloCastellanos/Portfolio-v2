import { Component, signal } from '@angular/core';
import { collectionData, Firestore, collection } from '@angular/fire/firestore'; // ✅ todo desde aquí
// Transloco
import { TranslocoPipe } from '@ngneat/transloco';
//
import { Work } from '../../models/work';
import { TimeLine } from './components/time-line/time-line';
import { ToolsLanguages } from '../../shared/components/tools-languages/tools-languages';

@Component({
  selector: 'resume',
  imports: [TimeLine, TranslocoPipe, ToolsLanguages],
  templateUrl: './resume.html',
  styleUrl: './resume.css',
})
export class Resume {
  workList = signal<Work[]>([]);

  constructor(private firestore: Firestore) {
    this.getWork();
  }

  private getWork() {
    collectionData(collection(this.firestore, "trabajos")).subscribe((data: any) => {
      this.workList.set(data);
    });
  }
}
