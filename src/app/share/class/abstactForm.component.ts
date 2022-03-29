import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractAPIService } from './abstractAPI.service';

@Component({
  template:''
})
export abstract class AbstractFormComponent {

  @Output() close:EventEmitter<void> = new EventEmitter<void>();

  values:unknown;

  constructor(
    private baseService:AbstractAPIService<unknown,unknown>
  ) { }
  

  abstract get  formValid():boolean;

  onSubmit(){
    this.baseService.store({data:this.values})
    .subscribe({
      next:()=>{
        this.onReset();
      },
      error:(error)=>{}
    });
  }

  onReset(){
    this.close.emit();
  }
}

