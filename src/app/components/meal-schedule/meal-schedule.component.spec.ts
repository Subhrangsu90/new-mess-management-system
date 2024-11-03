import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealScheduleComponent } from './meal-schedule.component';

describe('MealScheduleComponent', () => {
  let component: MealScheduleComponent;
  let fixture: ComponentFixture<MealScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealScheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MealScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
