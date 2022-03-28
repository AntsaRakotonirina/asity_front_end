import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { myEnv } from 'src/environments/myEnv';
import { ScientifiqueAttributes } from '../models/scientifique.model';
import { AbstractAPIService } from '../share/class/abstractAPI.service';

@Injectable({
  providedIn: 'root'
})
export class ScientifiqueService extends AbstractAPIService<ScientifiqueAttributes,ScientifiqueAttributes> {
  public override baseURL: string = myEnv.urls.scientifique;
  protected override type: string = 'scientifique';

  constructor(
    protected override http:HttpClient,
    protected override messageService:MessageService) {
    super(http,messageService);
  }

  public get scientifiques(){
    return this._data;
  }
}
