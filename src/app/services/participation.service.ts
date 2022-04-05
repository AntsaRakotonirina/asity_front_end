import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { myEnv } from 'src/environments/myEnv';
import { ParticipationAttributes } from '../models/participations.model';
import { AbstractAPIService } from '../share/class/abstractAPI.service';

@Injectable({
  providedIn: 'root'
})
export class ParticipationService extends AbstractAPIService<ParticipationAttributes,ParticipationAttributes> {
  public override baseURL: string = myEnv.urls.participation;
  protected override type: string = 'participation';
  constructor(
    protected override http:HttpClient,
    protected override messageService:MessageService
  ) {
    super(http,messageService);
  }
}
