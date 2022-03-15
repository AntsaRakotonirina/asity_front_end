import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { myEnv } from 'src/environments/myEnv';
import { AnimalAttributes } from '../models/animal.model';
import { EntityContainer, PaginatedData } from '../models/entityContainer.model';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private _animals!:PaginatedData<EntityContainer<AnimalAttributes>>

  constructor(public http:HttpClient) { }

  public get animals(){
    return this._animals;
  }

  public index(request:SearchRequest,url:string=myEnv.urls.animal+'?'){
    return this.http.get<PaginatedData<EntityContainer<AnimalAttributes>>>(
      url+'attribute='+request.attribute+"&search="+request.search
    )
    .pipe(
      tap({
        next:(response)=>{
          this._animals = response;
        }
      })
    );
  }

  public store(){}

  public update(){}

  public delete(id:number){
      return this.http.delete(myEnv.urls.animal+"/"+id)
      .pipe(tap({
        next:()=>{
          console.log("supprimer");
          this.index({attribute:"nom",search:''}).subscribe();
        }
      }));
  }
}

export interface SearchRequest{
  attribute:string,
  search:string
}
