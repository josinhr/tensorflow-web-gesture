import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementTutorialComponent } from './movement-tutorial.component';

describe('MovementTutorialComponent', () => {
  let component: MovementTutorialComponent;
  let fixture: ComponentFixture<MovementTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovementTutorialComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
