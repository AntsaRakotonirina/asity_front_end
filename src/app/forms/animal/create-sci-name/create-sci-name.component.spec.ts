import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSciNameComponent } from './create-sci-name.component';

describe('CreateSciNameComponent', () => {
  let component: CreateSciNameComponent;
  let fixture: ComponentFixture<CreateSciNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSciNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSciNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
