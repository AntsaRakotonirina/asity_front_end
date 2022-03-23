import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVerNameComponent } from './create-ver-name.component';

describe('CreateVerNameComponent', () => {
  let component: CreateVerNameComponent;
  let fixture: ComponentFixture<CreateVerNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateVerNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVerNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
