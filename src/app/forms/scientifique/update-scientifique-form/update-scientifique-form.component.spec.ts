import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateScientifiqueFormComponent } from './update-scientifique-form.component';

describe('UpdateScientifiqueFormComponent', () => {
  let component: UpdateScientifiqueFormComponent;
  let fixture: ComponentFixture<UpdateScientifiqueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateScientifiqueFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateScientifiqueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
