import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  buttonMenu:MenuItem[]=[];

  @Input() buttonLabel:string = "label";
  @Input() active:boolean = false;

  @Output() select:EventEmitter<void> = new EventEmitter<void>();
  @Output() info:EventEmitter<void>   = new EventEmitter<void>();
  @Output() update:EventEmitter<void> = new EventEmitter<void>();
  @Output() delete:EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    this.buttonMenu = [
      {
        label:"Information",
        icon:"pi pi-fw pi-info-circle",
        command: ()=>{this.onInfo()}
      },
      {
        label:"Modifier",
        icon:"pi pi-fw pi-pencil",
        command: ()=>{this.onUpdate()}
      },
      {
        label:"Supprimer",
        icon:"pi pi-fw pi-trash",
        command: ()=>{this.onDelete()}
      }
    ]
  }

  onSelect() { this.select.emit(); }
  onInfo()   { this.info.emit();   }
  onUpdate() { this.update.emit(); }
  onDelete() { this.delete.emit(); }
}
