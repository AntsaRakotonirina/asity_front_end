import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { SuiviRequest } from 'src/app/models/requests/suiviRequest.model.model';
import { SuiviService } from 'src/app/services/suivi.service';

@Component({
  selector: 'app-create-suivi',
  templateUrl: './create-suivi.component.html',
  styleUrls: ['./create-suivi.component.css']
})
export class CreateSuiviComponent implements OnInit {
  request:SuiviRequest={
    default_date: new Date()
  }
  constructor(
    private suiviServie: SuiviService,
    private ref:DynamicDialogRef
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.suiviServie.store(this.request)
    .subscribe({
      next:()=>{
        this.ref.close();
      },
      error:(error)=>{}
    });
  }
  onReset(){
    this.ref.close();
  }
}
