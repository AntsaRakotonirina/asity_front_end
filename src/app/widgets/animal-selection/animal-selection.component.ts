import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-animal-selection',
  templateUrl: './animal-selection.component.html',
  styleUrls: ['./animal-selection.component.css']
})
export class AnimalSelectionComponent implements OnInit {
  @Input() name:string = "Animal";
  @Input() id:number=0;
  @Output() idChange:EventEmitter<number>= new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  onSelect(event:{id:number,name:string}){
    this.name = event.name;
    this.id = event.id;
    this.idChange.emit(event.id);
  }
}
