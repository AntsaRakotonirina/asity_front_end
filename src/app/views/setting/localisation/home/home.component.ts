import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ParentService } from 'src/app/services/localisation/parent.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public bread!:MenuItem;
  constructor(public parentService:ParentService) { }
  get parents(){
    return this.parentService.parents;
  }
  ngOnInit(): void {
    this.parentService.index().subscribe();
    this.bread = {routerLink:['home'],icon:'pi pi-home'}
  }

}
