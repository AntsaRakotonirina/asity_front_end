import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './views/login/login.component';
import { MainComponent } from './views/main/main.component';

const routes: Routes = [
  {path:'',redirectTo:'app',pathMatch:'full'},
  {path:"login",component:LoginComponent,canActivate:[LoginGuard]},
  {path:"app",component:MainComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
