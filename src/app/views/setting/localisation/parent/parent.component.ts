import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  public bread!:MenuItem;
  constructor() { }

  ngOnInit(): void {
    this.bread = {label:' Site Parent',routerLink:['parent'],icon:'pi pi-home'}
  }

}
