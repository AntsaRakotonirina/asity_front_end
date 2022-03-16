import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateAnimalFormComponent } from 'src/app/forms/animal/create-animal-form/create-animal-form.component';
import { AnimalAttributes } from 'src/app/models/animal.model';
import { EntityContainer } from 'src/app/models/entityContainer.model';
import { SearchRequest } from 'src/app/models/requests/searchRequest.model';
import { AnimalService } from 'src/app/services/animal.service';
import { AbstractComponent } from '../abstractView.component';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent extends AbstractComponent<AnimalAttributes> implements OnInit {

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

  _selectedAttribute:Attributes={
    nom:'nom'
  }

  protected override _searchAttribute:string = this._selectedAttribute.nom;

  constructor(
    protected animalService:AnimalService,
    protected override confirmationService:ConfirmationService,
    private dialogService:DialogService
  ) {
    super(animalService,confirmationService);
  }

  override search(){
    const search:SearchRequest = {
      attribute:this._selectedAttribute.nom,
      search:this._search
    }
    this.baseService.index(search).subscribe();
  }

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

  override onDelete(animal:EntityContainer<AnimalAttributes>){
    this._deleteMessage = "Etes vous sur de vouloir retirer le "+animal.attributes.nom_courrant+" ?";
    super.onDelete(animal);
  }

}

interface Attributes{
  nom:string
}
