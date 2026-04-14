import { Injectable, signal, computed, effect, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  private readonly keyTheme: string = "theme";
  private readonly _isDark = signal<boolean>(false);
  isDark = computed(() => this._isDark());

  constructor(@Inject(DOCUMENT) private readonly doc: Document) {
    const saved = localStorage.getItem(this.keyTheme);
    const prefersDark = globalThis.matchMedia('(prefers-color-scheme: dark)').matches;
    // Prioridad: localStorage > sistema operativo > light
    const startDark = saved === 'dark' || (!saved && prefersDark);
    this._isDark.set(startDark);
    this.applyTheme(startDark);
    effect(() => { this.applyTheme(this._isDark()); });
  }

  toggle(): void {
    this._isDark.update(v => !v);
    localStorage.setItem(this.keyTheme, this._isDark() ? 'dark' : 'light');
  }

  private applyTheme(dark: boolean): void {
    this.doc.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }
}
