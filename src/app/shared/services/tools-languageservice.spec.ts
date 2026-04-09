import { TestBed } from '@angular/core/testing';

import { ToolsLanguageservice } from './tools-languageservice';

describe('ToolsLanguageservice', () => {
  let service: ToolsLanguageservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolsLanguageservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
