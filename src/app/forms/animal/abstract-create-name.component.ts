import { ConfirmationService } from 'primeng/api';
import { EntityContainer } from 'src/app/models/entityContainer.model';
import { VerNameAttributes } from 'src/app/models/name.model';
import { VernameRequest } from 'src/app/models/requests/animalRequest.model';
import { AnimalService } from 'src/app/services/animal.service';
import { NameService } from 'src/app/services/name.service';


/**
 * @template Attr Type d'attribue du nom
 * @template Req type de requete utiliser pour faire un save
 */
export abstract class CreateNameComponent<Attr,Req> {
  _nameList:EntityContainer<Attr>[]|null=[];
  _animalId:number=-1;
  nameType:string='';

  constructor(
    protected animalService:AnimalService,
    protected nameService:NameService,
    protected confirmationService:ConfirmationService) { }

  onDelete(id:number){
    this.confirmationService.confirm({
      message: "Supprimer ce nom ?",
      acceptLabel: "Supprimer",
      icon:"pi pi-exclamation-triangle",
      rejectLabel: "Annuler",
      accept:()=>{
        this.delete(id);
      }
    })
  } 

  delete(id:number){
    this.nameService.deleteName(this.nameType,id).subscribe(
      {next:()=>{
        const index = this._nameList?.findIndex((name)=>name.id === id);
        this._nameList?.splice(index as number,1);
      }
    })
  }

  abstract onCreate(request:Req):void;
}
