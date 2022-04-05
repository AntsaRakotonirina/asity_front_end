import { Component, Input, OnInit } from '@angular/core';
import { ObservationRequest } from 'src/app/models/requests/observationRequest.model';
import { ObservationService } from 'src/app/services/observation.service';
import { AbstractFormComponent } from 'src/app/share/class/abstactForm.component';

@Component({
  selector: 'app-create-observation',
  templateUrl: './create-observation.component.html',
  styleUrls: ['./create-observation.component.css']
})
export class CreateObservationComponent extends AbstractFormComponent implements OnInit {
  @Input() suivi_id:number= NaN;
  @Input() default_date:Date = new Date();

  _isNext:boolean= false
  override values:ObservationRequest={
    habitat: '',
    latitude: 0,
    longitude: 0,
    nombre: 0,
    presence: false,
    abondance: 0,
    animal_id: 0,
    suivi_id: 0,
    zone: '',
    date: new Date()
  }

  get formValid(): boolean {
    return this.values.animal_id > 0;
  }
  constructor(
    private observationService:ObservationService,
  ) {
    super(observationService);
  }

  override onSubmit(): void {
      this.values.suivi_id = this.suivi_id;
      super.onSubmit();
  }
  
  ngOnInit(): void {
    this.values.date = this.default_date;
  }
}
