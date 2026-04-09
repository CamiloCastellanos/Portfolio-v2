import { Injectable } from '@angular/core';
import { ToolLanguage } from '../../models/toolLanguage';
import toolsLanguagesJSON from '../../../assets/json/tools-languages.json'

@Injectable({
  providedIn: 'root',
})
export class ToolsLanguageservice {
  toolList: ToolLanguage[] = [];

  constructor() {
    this.getToolsLanguage();
  }

  getToolsLanguage() {
    this.toolList = toolsLanguagesJSON.tools.map((tool: any) => {
      const { name, image, state } = tool;
      return {
        name,
        image,
        state
      } as ToolLanguage;
    })
  }

  getListFilter(state: number, stateDefault: number) {
    return this.toolList.filter(
      h =>
        h.state == state
        ||
        h.state == stateDefault
    )
  }

}
