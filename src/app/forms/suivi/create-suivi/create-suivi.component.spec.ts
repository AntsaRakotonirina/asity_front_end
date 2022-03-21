import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSuiviComponent } from './create-suivi.component';

describe('CreateSuiviComponent', () => {
  let component: CreateSuiviComponent;
  let fixture: ComponentFixture<CreateSuiviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSuiviComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSuiviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
