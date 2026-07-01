import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxEstimator } from './tax-estimator';

describe('TaxEstimator', () => {
  let component: TaxEstimator;
  let fixture: ComponentFixture<TaxEstimator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxEstimator],
    }).compileComponents();

    fixture = TestBed.createComponent(TaxEstimator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
