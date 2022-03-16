import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateScientifiqueFormComponent } from './create-scientifique-form.component';

describe('CreateScientifiqueFormComponent', () => {
  let component: CreateScientifiqueFormComponent;
  let fixture: ComponentFixture<CreateScientifiqueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateScientifiqueFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateScientifiqueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
