import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateCaloriesComponent } from './calculate-calories.component';

describe('CalculateCaloriesComponent', () => {
  let component: CalculateCaloriesComponent;
  let fixture: ComponentFixture<CalculateCaloriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculateCaloriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateCaloriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
