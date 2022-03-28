import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { myEnv } from 'src/environments/myEnv';
import { SuiviAttributes, SuiviSingleAttributes } from '../models/suivi.model';
import { AbstractAPIService } from '../share/class/abstractAPI.service';
import { IndexRequest } from '../share/interfaces/CrudInterface';

@Injectable({
  providedIn: 'root'
})
export class SuiviService extends AbstractAPIService<SuiviAttributes,SuiviSingleAttributes>{
  public override baseURL: string = myEnv.urls.suivi;
  protected override type: string = 'suivi';

  constructor(
    protected override http:HttpClient,
    protected override messageService:MessageService) {
    super(http,messageService);
  }

  override generateUrl(request:DateIndexRequest):string{
    let response :string = this.baseURL+'?';
    if(request.page){
      response += `page=${request.page}&`
    }
    if(request.date){
      response += `from=${this.transformDate(request.date.from)}&to=${this.transformDate(request.date.to)}`
    }

    return response;
  }

  private transformDate(date:Date):string{
      return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
  }
  
  public get suivis(){
    return this._data;
  }
}

export interface DateIndexRequest extends IndexRequest{
  date?:{from:Date,to:Date},
  page?:number
}
