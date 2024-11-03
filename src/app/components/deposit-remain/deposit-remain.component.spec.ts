import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositRemainComponent } from './deposit-remain.component';

describe('DepositRemainComponent', () => {
  let component: DepositRemainComponent;
  let fixture: ComponentFixture<DepositRemainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositRemainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepositRemainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
