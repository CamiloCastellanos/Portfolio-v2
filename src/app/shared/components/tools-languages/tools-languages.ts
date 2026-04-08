import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Transloco
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'tools-languages',
  imports: [TranslocoPipe, CommonModule],
  templateUrl: './tools-languages.html',
  styleUrl: './tools-languages.css',
})
export class ToolsLanguages {

  // tools = {
  //   languages: [
  //     { name: 'TypeScript', icon: 'assets/icons/typescript.svg' },
  //     { name: 'JavaScript', icon: 'assets/icons/javascript.svg' }
  //   ],
  //   frameworks: [
  //     { name: 'Angular', icon: 'assets/icons/angular.svg' },
  //     { name: '.NET', icon: 'assets/icons/dotnet.svg' }
  //   ],
  //   tools: [
  //     { name: 'Git', icon: 'assets/icons/git.svg' },
  //     { name: 'Docker', icon: 'assets/icons/docker.svg' }
  //   ]
  // }

  tools = [
    { name: 'Git', icon: 'https://i.postimg.cc/FszYnfHX/GitHub.webp' },
    { name: 'Docker', icon: 'https://i.postimg.cc/hvVnLNh8/angular.webp' },
    { name: 'Docker', icon: 'https://i.postimg.cc/hvVnLNh8/angular.webp' },
    { name: 'Docker', icon: 'https://i.postimg.cc/hvVnLNh8/angular.webp' },
    { name: 'Docker', icon: 'https://i.postimg.cc/hvVnLNh8/angular.webp' },
    { name: 'Docker', icon: 'https://i.postimg.cc/hvVnLNh8/angular.webp' },
    { name: 'Docker', icon: 'https://i.postimg.cc/hvVnLNh8/angular.webp' },
    { name: 'Docker', icon: 'https://i.postimg.cc/hvVnLNh8/angular.webp' },
    { name: 'Docker', icon: 'https://i.postimg.cc/hvVnLNh8/angular.webp' },
    { name: 'Docker', icon: 'https://i.postimg.cc/hvVnLNh8/angular.webp' },
    { name: 'Docker', icon: 'https://i.postimg.cc/hvVnLNh8/angular.webp' },
    { name: 'Docker', icon: 'https://i.postimg.cc/hvVnLNh8/angular.webp' },

  ]
}
