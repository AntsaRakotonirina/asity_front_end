import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComNameComponent } from './create-com-name.component';

describe('CreateComNameComponent', () => {
  let component: CreateComNameComponent;
  let fixture: ComponentFixture<CreateComNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateComNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
