import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestureFeedbackComponent } from './gesture-feedback.component';

describe('GestureFeedbackComponent', () => {
  let component: GestureFeedbackComponent;
  let fixture: ComponentFixture<GestureFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestureFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestureFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
