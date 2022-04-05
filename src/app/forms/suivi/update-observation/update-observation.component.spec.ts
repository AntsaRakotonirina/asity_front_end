import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateObservationComponent } from './update-observation.component';

describe('UpdateObservationComponent', () => {
  let component: UpdateObservationComponent;
  let fixture: ComponentFixture<UpdateObservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateObservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateObservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
