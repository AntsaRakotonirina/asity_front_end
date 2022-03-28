import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { ComponentState } from 'src/app/share/class/abstract.component';
import { ComponentEventsInterface } from 'src/app/share/interfaces/ComponentOperationsInterface';
import { myEnv } from 'src/environments/myEnv';


/**
 * @note Cretaine methode sont bouchonner (ne font rien) car onn as deja une implementation du dial sur le component appelant
 * Elles sont toute fois presente car l'interface l'oblige
 */
@Component({
  selector: 'app-global-list',
  templateUrl: './global-list.component.html',
  styleUrls: ['./global-list.component.css']
})
export class GlobalListComponent implements OnInit, ComponentEventsInterface {
  @Input() searchable:boolean=true;
  @Input() _dialItems:MenuItem[]=[];
  @Input() total:number=myEnv.rowPerPage;
  @Input() parentState:ComponentState={
    isLoading: false,
    isSearching: false
  };
  @Input() dialRadius:number = 120;

  @Output() pageChange:EventEmitter<any> = new EventEmitter<any>();
  @Output() search:EventEmitter<void> = new EventEmitter<void>();

  constructor(public authService:AuthService) { }
  ngOnInit(): void {
  }
  onAdd(): void {}

  onRefresh(): void {}

  onPage(page: unknown): void {
    this.pageChange.emit(page);
  }

  onSearch(): void {
    this.search.emit();
  }

  onMassDelete(index: number): void {}

  onUnSelectAll(): void {}
}
