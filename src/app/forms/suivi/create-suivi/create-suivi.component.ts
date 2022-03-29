import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SuiviRequest } from 'src/app/models/requests/suiviRequest.model.model';
import { SuiviService } from 'src/app/services/suivi.service';
import { AbstractFormComponent } from 'src/app/share/class/abstactForm.component';

@Component({
  selector: 'app-create-suivi',
  templateUrl: './create-suivi.component.html',
  styleUrls: ['./create-suivi.component.css']
})
export class CreateSuiviComponent extends AbstractFormComponent implements OnInit {
  
  
  override values:SuiviRequest={
    default_date: new Date()
  }

  constructor(
    private suiviServie: SuiviService
  ) {
    super(suiviServie)
   }

   get formValid(): boolean { throw true; }

  ngOnInit(): void {
  }

  override onSubmit(){
    this.suiviServie.store({data:{default_date:this.transformDate(this.values.default_date)}})
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
  
}
