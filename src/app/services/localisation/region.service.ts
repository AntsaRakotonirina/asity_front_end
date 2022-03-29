import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs';
import { RegionAttributes } from 'src/app/models/localisation.model';
import { AbstractAPIService } from 'src/app/share/class/abstractAPI.service';
import { IndexRequest } from 'src/app/share/interfaces/CrudInterface';
import { myEnv } from 'src/environments/myEnv';

@Injectable({
  providedIn: 'root'
})
export class RegionService extends AbstractAPIService<RegionAttributes,RegionAttributes> {
  public override baseURL: string = myEnv.urls.region;
  public override parentURL: string | null = myEnv.urls.parent;
  public override slug:string = 'regions';
  public parentId:number=NaN;

  constructor(
    protected override http:HttpClient,
    protected override messageService:MessageService) {
    super(http,messageService)
  }

  get regions(){
    return this._data;
  }

  /**
   * Methode qui entour le methode index de @AbstractAPIService pour permetre ajouter une fonctionalier de watcher sur le parent
   * A tout moment @parentId conservera l'identifiant de son parent
   */
  public override index(request:IndexRequest){
    return super.index(request).pipe(map((reponse)=>{
      this.parentId = request.parentId as number;
      return reponse;
    }))
  }

  public purge(){
    this._data = null;
  }
}
