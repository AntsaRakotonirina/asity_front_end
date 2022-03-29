import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {


  @Input() buttonLabel:string = "label";
  @Input() active:boolean = false;

  @Input() haveInfo:boolean = true;
  @Input() haveEdit:boolean = true;
  @Input() haveDelete:boolean = true;

  @Output() select:EventEmitter<void> = new EventEmitter<void>();
  @Output() info:EventEmitter<void>   = new EventEmitter<void>();
  @Output() update:EventEmitter<void> = new EventEmitter<void>();
  @Output() delete:EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelect() { this.select.emit(); }
  onInfo()   { this.info.emit();   }
  onUpdate() { this.update.emit(); }
  onDelete() { this.delete.emit(); }
}
