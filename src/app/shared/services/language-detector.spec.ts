import { TestBed } from '@angular/core/testing';

import { LanguageDetector } from './language-detector';

describe('LanguageDetector', () => {
  let service: LanguageDetector;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageDetector);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
