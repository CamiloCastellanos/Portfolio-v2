import { Pipe, PipeTransform, inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';

@Pipe({
  name: 'translateText',
  pure: false
})
export class TranslateTextPipe implements PipeTransform, OnDestroy {
  private translate: TranslocoService = inject(TranslocoService);
  private langSubscription: Subscription;
  private currentLang: string;
  private lastObj: any = null;
  private lastFieldSp: string = '';
  private lastFieldEn: string = '';
  private lastResult: string = '';

  constructor() {
    this.currentLang = this.translate.getActiveLang();
    this.langSubscription = this.translate.langChanges$.subscribe((lang: string) => {
      this.currentLang = lang;
      this.lastObj = null;
    });
  }

  transform(obj: any, fieldSp: string, fieldEn: string): string {
    if (!obj || !fieldSp || !fieldEn) {
      return '';
    }
    const isSameParams = this.lastObj === obj &&
      this.lastFieldSp === fieldSp &&
      this.lastFieldEn === fieldEn;

    if (isSameParams) {
      return this.lastResult;
    }
    this.lastObj = obj;
    this.lastFieldSp = fieldSp;
    this.lastFieldEn = fieldEn;
    const useSpanish = this.currentLang === 'es';
    const fieldToUse = useSpanish ? fieldSp : fieldEn;
    let result = obj[fieldToUse];
    if (!result) {
      const fallbackField = useSpanish ? fieldEn : fieldSp;
      result = obj[fallbackField] || '';
    }

    this.lastResult = result;
    return result;
  }

  ngOnDestroy() {
    this.langSubscription?.unsubscribe();
  }
}
