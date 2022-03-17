import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  items:MenuItem[]=[];
  constructor() { }

  ngOnInit(): void {
    this.items = [
      {label:'localisation', icon:"pi pi-map-marker",routerLink:['localisations']},
      {label:'Utilisateur', icon:"pi pi-user",routerLink:['user']}
    ]
  }

}
