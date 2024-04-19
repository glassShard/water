import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartWaterComponent } from './start-water.component';

describe('StartWaterComponent', () => {
  let component: StartWaterComponent;
  let fixture: ComponentFixture<StartWaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartWaterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartWaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
