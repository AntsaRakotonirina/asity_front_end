import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem, PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private primengConfig:PrimeNGConfig){};
  title = 'asity';
  items: MegaMenuItem[]=[];
  cities:City[]=[];
  selectedCity:City | undefined;
  ngOnInit(): void {
    this.primengConfig.ripple=true;
    this.cities = [
      {name:'Antananarivo',id:1},
      {name:'Paris',id:2},
      {name:'Mareille',id:3},
      {name:'Antsirabe',id:4},
      {name:'Lyon',id:5},
    ]
  }
}

interface City{
  name:string,
  id:number
}