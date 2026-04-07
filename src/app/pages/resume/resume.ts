import { Component, signal } from '@angular/core';
import { collectionData, Firestore, collection } from '@angular/fire/firestore'; // ✅ todo desde aquí
import { Work } from '../../models/work';
import { TimeLine } from './components/time-line/time-line';

@Component({
  selector: 'resume',
  imports: [TimeLine],
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
