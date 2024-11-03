import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingListComponent } from './marketing-list.component';

describe('MarketingListComponent', () => {
  let component: MarketingListComponent;
  let fixture: ComponentFixture<MarketingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketingListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarketingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
