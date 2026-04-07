import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallToScroll } from './call-to-scroll';

describe('CallToScroll', () => {
  let component: CallToScroll;
  let fixture: ComponentFixture<CallToScroll>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallToScroll],
    }).compileComponents();

    fixture = TestBed.createComponent(CallToScroll);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
