import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateAnimalFormComponent } from 'src/app/forms/animal/create-animal-form/create-animal-form.component';
import { AnimalAttributes } from 'src/app/models/animal.model';
import { EntityContainer, PaginatedData } from 'src/app/models/entityContainer.model';
import { SearchRequest } from 'src/app/models/requests/searchRequest.model';
import { AnimalService } from 'src/app/services/animal.service';
import { myEnv } from 'src/environments/myEnv';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {

  attributes:Attributes[]=[
    {nom:'nom'},
    {nom:'categorie'},
    {nom:'endemicite'},
    {nom:'espece'},
    {nom:'famille'},
    {nom:'genre'},
    {nom:'guild'},
    {nom:'status'}
  ];

  _selectedIds:number[]=[];

  _selectedAttribute:Attributes={
    nom:'nom'
  }
  _search:string="";

  _dialItems:MenuItem[]=[];

  constructor(
    private animalService:AnimalService,
    private confirmationService:ConfirmationService,
    private dialogService:DialogService
  ) { }

  ngOnInit(): void {
    this.search();
    this._dialItems = [
      {
        icon: 'pi pi-plus',
        command:()=>{
          this.dialogService.open(CreateAnimalFormComponent,{
            header:"Ajoutez un nouvel animal"
          })
        }
      },
      {
        icon: 'pi pi-times',
        command:()=>{
          if(this._selectedIds.length > 0){this._selectedIds.splice(0);this.search()}
        }
      },
      {
        icon: 'pi pi-refresh',
        command:()=>{
          this.search()
        }
      },
      {
        icon: 'pi pi-trash',
        command:()=>{}
      },
    ]
  }

  public get animals(){
    return this.animalService.animals;
  }

  search(){
    const search:SearchRequest = {
      attribute:this._selectedAttribute.nom,
      search:this._search
    }
    this.animalService.index(search).subscribe();
  }

  onPage(event:any){
    const url = myEnv.urls.animal+'?page='+(event.page+1)+"&";
    const search:SearchRequest = {
      attribute:this._selectedAttribute.nom,
      search:this._search
    }
    this.animalService.index(search,url).subscribe();
  }

  onDelete(animal:EntityContainer<AnimalAttributes>){
    this.confirmationService.confirm({
      header:"Suppresion",
      message: "Etes vous sur de vouloir retirer le "+animal.attributes.nom_courrant+" ?",
      acceptLabel: "Supprimer",
      icon:"pi pi-exclamation-triangle",
      accept:()=>{
        this.animalService.delete(animal.id).subscribe();
      }
    })
  }

  onUpdate(animal:EntityContainer<AnimalAttributes>){}

  onSearch(){
    this.search()
  }

}

interface Attributes{
  nom:string
}
