import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ComponentState } from 'src/app/share/class/abstract.component';
import { myEnv } from 'src/environments/myEnv';

@Component({
  selector: 'app-setting-list',
  templateUrl: './setting-list.component.html',
  styleUrls: ['./setting-list.component.css']
})
export class SettingListComponent implements OnInit {

  @Input() total:number=myEnv.rowPerPage;
  @Input() parentState:ComponentState={
    isLoading: false,
    isSearching: false
  };

  @Output() pageChange:EventEmitter<any> = new EventEmitter<any>();
  @Output() create:EventEmitter<void> = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  onPage(page: unknown):void {
    this.pageChange.emit(page);
  }
  
  onCreate(){
    this.create.emit();
  }
}
