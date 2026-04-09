import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// Transloco
import { TranslocoPipe } from '@ngneat/transloco';
import { ToolsLanguageservice } from '../../services/tools-languageservice';
import { ToolLanguage } from '../../../models/toolLanguage';

@Component({
  selector: 'tools-languages',
  imports: [TranslocoPipe, CommonModule],
  templateUrl: './tools-languages.html',
  styleUrl: './tools-languages.css',
})
export class ToolsLanguages implements OnInit {
  @Input() stateDefault: number = -1;
  @Input() state: number = -1;
  @Input() aditionalText: string = "";
  toolList: ToolLanguage[] = [];
  constructor(private readonly toolsLanguageservice: ToolsLanguageservice) { }

  ngOnInit(): void {
    this.toolList = this.toolsLanguageservice.getListFilter(this.state, this.stateDefault);
  }
}
