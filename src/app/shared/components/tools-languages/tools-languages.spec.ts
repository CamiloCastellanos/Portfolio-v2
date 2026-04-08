import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsLanguages } from './tools-languages';

describe('ToolsLanguages', () => {
  let component: ToolsLanguages;
  let fixture: ComponentFixture<ToolsLanguages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolsLanguages],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolsLanguages);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
