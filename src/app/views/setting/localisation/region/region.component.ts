import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RegionService } from 'src/app/services/localisation/region.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['../localisation.component.css','./region.component.css']
})
export class RegionComponent implements OnInit {
  @Output() select:EventEmitter<number> = new EventEmitter<number>();
  
  constructor(private regionService:RegionService) { }

  get regions(){
    return this.regionService.regions;
  }

  ngOnInit(): void {}
  
  onSelect(id:number){
    this.select.emit(id);
  }

}
