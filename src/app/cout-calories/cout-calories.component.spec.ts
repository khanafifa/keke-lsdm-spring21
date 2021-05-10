import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoutCaloriesComponent } from './cout-calories.component';

describe('CoutCaloriesComponent', () => {
  let component: CoutCaloriesComponent;
  let fixture: ComponentFixture<CoutCaloriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoutCaloriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoutCaloriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
