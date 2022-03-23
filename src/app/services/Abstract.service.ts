import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { myEnv } from 'src/environments/myEnv';
import { EntityContainer, PaginatedData, SingleEntityContainer } from '../models/entityContainer.model';
import { DataMessage } from '../models/message.model';
import { SearchRequest } from '../models/requests/searchRequest.model';

export abstract class AbstractService<T> {

  protected _data!:PaginatedData<EntityContainer<T>>
  protected defaultAttribute:string='';

  protected valueName:string = 'Entiter';
  protected storeMessage:string = 'L\'entiter a bien ete ajouter';
  protected updateMessage:string = 'L\'entiter a bien été ajourner';
  protected deleteMessage:string = 'L\'entiter a bien été supprimer';

  public url:string = myEnv.urls.base;

  constructor(protected http:HttpClient,protected messageService:MessageService) {}

  public index(request:SearchRequest={attribute:this.defaultAttribute,search:''},url:string=this.url+'?'){
    return this.http.get<PaginatedData<EntityContainer<T>>>(
      url+'attribute='+request.attribute+"&search="+request.search
    )
    .pipe(
      tap({
        next:(response)=>{
          this._data = response;
        }
      })
    );
  }

  public store(request:any){
    return this.http.post<EntityContainer<T>>(this.url,request)
    .pipe(tap({
      next:()=>{
        this.messageService.add({severity:'success',summary:`${this.valueName} ajouter !`,detail:this.storeMessage})
        this.index().subscribe()
      },
      error:()=>{}
    }));
  }

  public update(request:any,id:number){
    return this.http.put<DataMessage<SingleEntityContainer<T>>>(this.url+'/'+id,request)
    .pipe(tap({
      next:()=>{
        this.messageService.add({severity:'success',summary:"Mis a jour réussi !",detail:this.updateMessage})
        this.index().subscribe()
      },
      error:()=>{}
    }));
  }

  public delete(id:number){
      return this.http.delete(this.url+"/"+id)
      .pipe(tap({
        next:()=>{
          // this.index().subscribe();
          let index =this._data.data.findIndex(element => element.id === id);
          if(index > 0){
            this._data.data.splice(index,1);
          }
          this.messageService.add({severity:'success',summary:'Suppretion réussi !',detail:this.deleteMessage})
        }
      }));
  }

}


