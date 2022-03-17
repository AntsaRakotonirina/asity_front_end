import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {
  public bread!:MenuItem[];
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.bread = [
      {label:' Site Parent',icon:'pi pi-home',command:()=>{this.router.navigateByUrl('/app/settings/localisations/parent')}},
      {label:'Region'}
    ]
  }

}
