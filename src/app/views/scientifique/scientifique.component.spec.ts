import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScientifiqueComponent } from './scientifique.component';

describe('ScientifiqueComponent', () => {
  let component: ScientifiqueComponent;
  let fixture: ComponentFixture<ScientifiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScientifiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScientifiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
