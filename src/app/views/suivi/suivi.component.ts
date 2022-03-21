import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateSuiviComponent } from 'src/app/forms/suivi/create-suivi/create-suivi.component';
import { EntityContainer } from 'src/app/models/entityContainer.model';
import { SuiviAttributes } from 'src/app/models/suivi.model';
import { AuthService } from 'src/app/services/auth.service';
import { SuiviService } from 'src/app/services/suivi.service';

@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.component.html',
  styleUrls: ['./suivi.component.css']
})
export class SuiviComponent implements OnInit {
  _selectedIds:number[]=[];
  _dialItems:MenuItem[]=[];
  _filterDates:{from:Date,to:Date}={
    from:new Date('1990-1-1'),
    to:new Date()
  }
  constructor(
    private suiviService:SuiviService,
    public authService:AuthService,
    private confirmationService:ConfirmationService,
    private dialogService:DialogService) { }

  ngOnInit(): void {
    this._dialItems =[
      {icon:'pi pi-plus',command:()=>{
        this.dialogService.open(CreateSuiviComponent,{
          header:"Ajoutez une nouvelle suivi"
        })
      }},
      {icon:'pi pi-refresh',command:()=>{this.index()}},
      {icon:'pi pi-times',command:()=>{
        this._selectedIds.splice(0);
        this.index();
      }},
      {icon:'pi pi-trash',command:()=>{
        this.confirmationService.confirm({
          header:"Suppresion",
          message: "Etes vous sur de vouloir supprimer ces suivi ?",
          acceptLabel: "Supprimer",
          icon:"pi pi-exclamation-triangle",
          accept:()=>{
            this.massDelete(0);
          }
        })
      }},
    ]
    this.index();
  }
  get suivis(){
    return this.suiviService.suivis;
  }
  index(){
    this.suiviService.index().subscribe();
  }
  
  onDelete(suivi:EntityContainer<SuiviAttributes>){
    this.confirmationService.confirm({
      header:"Suppresion",
      message: "Etes vous sur de vouloir supprimer cette suivi ?",
      acceptLabel: "Supprimer",
      icon:"pi pi-exclamation-triangle",
      accept:()=>{
        this.suiviService.destroy(suivi.id).subscribe();
      }
    })

  }


  public massDelete(index:number=0){
    
    if(index < this._selectedIds.length){
      this.suiviService.destroy(this._selectedIds[index])
      .subscribe({
        next:()=>{
          this.massDelete(index+1);
        },
        error:()=>{
          this.massDelete(index+1);
        }
      })
    }else{
      this._selectedIds.splice(0);
    }
    
  }

  onInfo(suivi:any){}
  
  onPage(page:any){
      this.suiviService.index(page.page+1,{
        from : this._filterDates.from.toDateString(),
        to: this._filterDates.to.toDateString()
      }).subscribe();
  }

  onFilter(){
    this.suiviService.index(1,{
      from : this._filterDates.from.toDateString(),
      to: this._filterDates.to.toDateString()
    }).subscribe();
  }
}
