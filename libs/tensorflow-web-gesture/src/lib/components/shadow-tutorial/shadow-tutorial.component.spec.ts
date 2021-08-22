import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadowTutorialComponent } from './shadow-tutorial.component';

describe('ShadowTutorialComponent', () => {
  let component: ShadowTutorialComponent;
  let fixture: ComponentFixture<ShadowTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShadowTutorialComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShadowTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
