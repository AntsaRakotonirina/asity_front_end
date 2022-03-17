import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {
  public bread!:MenuItem[];
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.bread = [
      {label:' Site Parent',icon:'pi pi-home',command:()=>{this.router.navigateByUrl('/app/settings/localisations/parent')}},
      {label:'Region',command:()=>{this.router.navigateByUrl('/app/settings/localisations/region')}},
      {label:'Site'}
    ]
  }

}
