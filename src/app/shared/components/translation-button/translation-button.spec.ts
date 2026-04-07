import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationButton } from './translation-button';

describe('TranslationButton', () => {
  let component: TranslationButton;
  let fixture: ComponentFixture<TranslationButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslationButton],
    }).compileComponents();

    fixture = TestBed.createComponent(TranslationButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
