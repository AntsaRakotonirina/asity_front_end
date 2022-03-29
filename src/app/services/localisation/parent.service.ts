import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ParentAttributes } from 'src/app/models/localisation.model';
import { AbstractAPIService } from 'src/app/share/class/abstractAPI.service';
import { myEnv } from 'src/environments/myEnv';

@Injectable({
  providedIn: 'root'
})
export class ParentService extends AbstractAPIService<ParentAttributes,ParentAttributes>{
  public override baseURL: string = myEnv.urls.parent;
  protected override type: string = 'Site parent';

  constructor(
    protected override http:HttpClient,
    protected override messageService:MessageService) {
    super(http,messageService)
  }

  get parents(){
    return this._data;
  }


  public purge(){
    this._data=null;
  }
}
