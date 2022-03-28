import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ParentRequest } from 'src/app/models/requests/localisationRequest.model';
import { ParentService } from 'src/app/services/localisation/parent.service';

@Component({
  selector: 'app-create-parent',
  templateUrl: './create-parent.component.html',
  styleUrls: ['./create-parent.component.css']
})
export class CreateParentComponent implements OnInit {

  @Output() close:EventEmitter<void> = new EventEmitter<void>()

  _request:ParentRequest={
    aireProteger: '',
    pays: 'MADAGASCAR',
    abreviation: '',
    latitude: 0.00,
    longitude: 0.00
  }

  get isValid(){
    return this._request.aireProteger.length > 0 &&
    this._request.pays.length > 0 &&
    this._request.abreviation.length > 0
  }

  constructor(private parentService:ParentService) { }

  ngOnInit(): void {
  }
  
  generateAbreviation(){
    const apWords = this._request.aireProteger.split(' ');
    let newAbv = '';
    apWords.forEach((word)=>{
      if(word)
        newAbv += word[0];
    })

    this._request.abreviation = newAbv;
  }

  onReset(){
    this._request = {
      aireProteger: '',
      pays: 'MADAGASCAR',
      abreviation: '',
      latitude: 0.00,
      longitude: 0.00
    }
    this.close.emit();
  }

  onCreate(){
    this.parentService.store(this._request).subscribe({
      next:()=>{this.close.emit()}
    });
  }
}
