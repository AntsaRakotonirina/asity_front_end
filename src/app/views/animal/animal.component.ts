import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AnimalAttributes } from 'src/app/models/animal.model';
import { EntityContainer, PaginatedData } from 'src/app/models/entityContainer.model';
import { AnimalService, SearchRequest } from 'src/app/services/animal.service';

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
  _selectedAttribute:Attributes={
    nom:'nom'
  }
  _search:string="";

  constructor(
    private animalService:AnimalService,
    private confirmationService:ConfirmationService
  ) { }

  ngOnInit(): void {
    this.search();
    
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

  onPage(url:any){
    const search:SearchRequest = {
      attribute:this._selectedAttribute.nom,
      search:this._search
    }
    this.animalService.index(search,url+"&").subscribe();
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
