import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { myEnv } from 'src/environments/myEnv';
import { LocalisationAttributes } from '../models/local.model';
import { AbstractAPIService } from '../share/class/abstractAPI.service';

@Injectable({
  providedIn: 'root'
})
export class LocalService extends AbstractAPIService<LocalisationAttributes,LocalisationAttributes>{
  public override baseURL: string = myEnv.urls.localisation;
  protected override type: string = 'localisation';
  
  constructor(
    protected override http:HttpClient,
    protected override messageService:MessageService
  ) {
    super(http,messageService);
  }
}
