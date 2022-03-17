import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    public authService:AuthService,
    private router:Router,
    private confirmationService:ConfirmationService
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout()
    .subscribe(
      ()=>{
        this.router.navigate(['login']);
      }
    );
  }
  
  onLogout(){
    this.confirmationService.confirm({
      header:"Deconnexion",
      message: "Etes vous sur de vouloir vous deconnectez ?",
      acceptLabel: "Deconnection",
      icon:"pi pi-exclamation-triangle",
      accept:()=>{
        this.logout();
      }
    })
  }

}
