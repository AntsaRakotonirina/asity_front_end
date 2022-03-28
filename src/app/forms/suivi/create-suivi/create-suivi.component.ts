import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SuiviRequest } from 'src/app/models/requests/suiviRequest.model.model';
import { SuiviService } from 'src/app/services/suivi.service';

@Component({
  selector: 'app-create-suivi',
  templateUrl: './create-suivi.component.html',
  styleUrls: ['./create-suivi.component.css']
})
export class CreateSuiviComponent implements OnInit {
  @Output() close:EventEmitter<void> = new EventEmitter();
  request:SuiviRequest={
    default_date: new Date()
  }
  constructor(
    private suiviServie: SuiviService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.suiviServie.store({data:{default_date:this.transformDate(this.request.default_date)}})
    .subscribe({
      next:()=>{
        this.close.emit()
      },
      error:(error)=>{}
    });
  }
  private transformDate(date:Date):string{
    return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
  }
  onReset(){
    this.close.emit()
  }
}
