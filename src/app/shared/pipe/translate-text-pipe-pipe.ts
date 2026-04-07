import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Pipe({
  name: 'translateText',
})
export class TranslateTextPipe implements PipeTransform {

  constructor(private translate: TranslocoService) { }

  transform(obj: any, fieldSp: string, fieldEn: string): string {
    if (!obj || !fieldSp || !fieldEn) return '';

    const lang = this.translate.getActiveLang() || this.translate.getDefaultLang();

    return lang == 'es' ? obj[fieldSp] : obj[fieldEn];
  }
}
