import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAnimalComponent } from './single-animal.component';

describe('SingleAnimalComponent', () => {
  let component: SingleAnimalComponent;
  let fixture: ComponentFixture<SingleAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleAnimalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
