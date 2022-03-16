import { ConfirmationService, MenuItem } from 'primeng/api';
import { EntityContainer} from 'src/app/models/entityContainer.model';
import { SearchRequest } from 'src/app/models/requests/searchRequest.model';
import { AbstractService } from '../services/Abstract.service';


export abstract class AbstractComponent<T>{

  public _selectedIds:number[]=[];
  public _search:string="";
  protected _searchAttribute:string = "";
  protected _deleteMessage:string = "Etes vous sur de vouloir retirer cette entiter";

  _dialItems:MenuItem[]=[];

  constructor(
    protected baseService:AbstractService<T>,
    protected confirmationService:ConfirmationService
  ) { }

  search(){
    const search:SearchRequest = {
      attribute:this._searchAttribute,
      search:this._search
    }
    this.baseService.index(search).subscribe();
  }

  onPage(event:any){
    const url = this.baseService.url+'?page='+(event.page+1)+"&";
    const search:SearchRequest = {
      attribute:this._searchAttribute,
      search:this._search
    }
    this.baseService.index(search,url).subscribe();
  }

  onDelete(entity:EntityContainer<T>){
    this.confirmationService.confirm({
      header:"Suppresion",
      message: this._deleteMessage,
      acceptLabel: "Supprimer",
      icon:"pi pi-exclamation-triangle",
      accept:()=>{
        this.baseService.delete(entity.id).subscribe();
      }
    })
  }

  onSearch(){
    this.search()
  }

}
