import { Component, signal } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
// Transloco
import { TranslocoPipe } from '@ngneat/transloco';
//
import { Project } from '../../models/project';
import { ToolsLanguages } from '../../shared/components/tools-languages/tools-languages';
import { Card } from './components/card/card';

@Component({
  selector: 'projects',
  imports: [TranslocoPipe, ToolsLanguages, Card],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {

  projectList = signal<Project[]>([]);

  constructor(private readonly firestore: Firestore) {
    this.getProject();
  }

  private getProject() {
    collectionData(collection(this.firestore, "proyectos")).subscribe((data: any) => {
      this.projectList.set(data);
    });
  }
}
