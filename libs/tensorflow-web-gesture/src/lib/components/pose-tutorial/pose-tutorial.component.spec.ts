import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoseTutorialComponent } from './pose-tutorial.component';

describe('PoseTutorialComponent', () => {
  let component: PoseTutorialComponent;
  let fixture: ComponentFixture<PoseTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoseTutorialComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoseTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
