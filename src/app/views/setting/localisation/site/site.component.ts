import { Component, Input, OnInit } from '@angular/core';
import { SiteService } from 'src/app/services/localisation/site.service';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['../localisation.component.css','./site.component.css']
})
export class SiteComponent implements OnInit {
  
  constructor(private siteService:SiteService) { }

  get  sites(){return this.siteService.sites}
  
  ngOnInit(): void {}

}
