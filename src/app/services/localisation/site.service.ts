import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { map, Observable, tap } from 'rxjs';
import { EntityContainer, PaginatedData } from 'src/app/models/entityContainer.model';
import { SiteAttributes } from 'src/app/models/localisation.model';
import { AbstractAPIService } from 'src/app/share/class/abstractAPI.service';
import { IndexRequest } from 'src/app/share/interfaces/CrudInterface';
import { myEnv } from 'src/environments/myEnv';

@Injectable({
  providedIn: 'root'
})
export class SiteService extends AbstractAPIService<SiteAttributes,SiteAttributes> {
  public override baseURL: string = myEnv.urls.site;
  public override parentURL: string | null = myEnv.urls.region;
  public override slug:string = 'sites';
  public regionId:number = NaN;

  constructor(
    protected override http:HttpClient,
    protected override messageService:MessageService) {
    super(http,messageService)
  }

  get sites(){
    return this._data;
  }

  /**
   * On sauvegarde la parentId au moment ou on obtien une reponse
   * Methode qui entour le methode index de @AbstractAPIService pour permetre ajouter une fonctionalier de watcher sur le parent
   * A tout moment @parentId conservera l'identifiant de son parent
   */
   public override index(request:IndexRequest){
    return super.index(request).pipe(map((reponse)=>{
      this.regionId = request.parentId as number;
      return reponse;
    }))
  }

  public purge(){
    this._data = null;
  }
}
