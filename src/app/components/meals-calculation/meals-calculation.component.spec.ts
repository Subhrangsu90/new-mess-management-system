import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealsCalculationComponent } from './meals-calculation.component';

describe('MealsCalculationComponent', () => {
  let component: MealsCalculationComponent;
  let fixture: ComponentFixture<MealsCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealsCalculationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MealsCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
