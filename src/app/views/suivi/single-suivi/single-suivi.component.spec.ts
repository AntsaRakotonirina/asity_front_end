import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSuiviComponent } from './single-suivi.component';

describe('SingleSuiviComponent', () => {
  let component: SingleSuiviComponent;
  let fixture: ComponentFixture<SingleSuiviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleSuiviComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSuiviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
