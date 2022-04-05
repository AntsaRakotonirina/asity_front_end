import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { myEnv } from 'src/environments/myEnv';
import { ObservationAttributes } from '../models/observation.model';
import { AbstractAPIService } from '../share/class/abstractAPI.service';

@Injectable({
  providedIn: 'root'
})
export class ObservationService extends AbstractAPIService<ObservationAttributes,ObservationAttributes>{
  public override baseURL: string = myEnv.urls.obsevation;
  protected override type: string = 'participation';
  constructor(
    protected override http:HttpClient,
    protected override messageService:MessageService
  ) {
    super(http,messageService);
  }
}
