import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AnimalAttributes } from 'src/app/models/animal.model';
import { EntityContainer, PaginatedData } from 'src/app/models/entityContainer.model';
import { myEnv } from 'src/environments/myEnv';

@Component({
  selector: 'app-list-animal',
  templateUrl: './list-animal.component.html',
  styleUrls: ['./list-animal.component.css']
})
export class ListAnimalComponent implements OnInit {
  _animal!:PaginatedData<EntityContainer<AnimalAttributes>>
  searchValue:string="";
  @Output() select:EventEmitter<{id:number,name:string}> = new EventEmitter();

  constructor(private http:HttpClient) {}

  ngOnInit(): void {
    this.index();
  }
  get isQuery(){
    return this.searchValue.length > 0;
  }

  index(){
    let url:string="";
    if(this.isQuery){
      url = `${myEnv.urls.animal}?attribute=nom&query=${this.searchValue}`;
    }else{
      url = `${myEnv.urls.animal}?attribute=nom`;
    }
    this.http.get<PaginatedData<EntityContainer<AnimalAttributes>>>(url).subscribe({
      next:(response)=>{
        this._animal = response;
      }
    })
  }

  onSearch(){
    this.index();
  }

  onSelect(animal:EntityContainer<AnimalAttributes>){
    this.select.emit({id:animal.id,name:animal.attributes.nom_courrant})
  }
}
