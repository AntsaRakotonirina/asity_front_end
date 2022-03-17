import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AnimalAttributes } from 'src/app/models/animal.model';
import { EntityContainer } from 'src/app/models/entityContainer.model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Input() id:number = 0;
  @Input() isEditable:boolean = true;
  @Output() delete:EventEmitter<any> = new EventEmitter();
  @Output() info:EventEmitter<any> = new EventEmitter();

  _menuItems: MenuItem[]=[];
  constructor() { }
  ngOnInit(): void {
    if(this.isEditable){
      this._menuItems = [
        {label:"Supprimer",icon:'pi pi-fw pi-trash',command:()=>{this.onDelete()}},
      ]
    }
    this._menuItems.push({label:"Information",icon:'pi pi-fw pi-info-circle',command:()=>{this.onUpdate()}})
  }

  onDelete(){
    this.delete.emit(this.id);
  }

  onUpdate(){
    this.info.emit(this.id);
  }
}
