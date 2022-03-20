import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ParentRequest } from 'src/app/models/requests/localisationRequest.model';
import { ParentService } from 'src/app/services/localisation/parent.service';


@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['../localisation.component.css','./parent.component.css']
})
export class ParentComponent implements OnInit {

  request: ParentRequest={
    aireProteger: '',
    pays: '',
    abreviation: '',
    latitude: 0,
    longitude: 0
  };

  @Output() select:EventEmitter<number> = new EventEmitter<number>();

  constructor(private parentService:ParentService) { }

  get parents(){
    return this.parentService.parents;
  }

  ngOnInit(): void {
    this.init();
  }

  init(){
    this.index()
  }

  index(){
    this.parentService.index().subscribe();
  }

  onSelect(id:number){
    this.select.emit(id);
  }
  

}
