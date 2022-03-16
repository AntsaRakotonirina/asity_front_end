import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestFormComponent } from './forms/test-form/test-form.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { AnimalComponent } from './views/animal/animal.component';
import { LoginComponent } from './views/login/login.component';
import { MainComponent } from './views/main/main.component';
import { ScientifiqueComponent } from './views/scientifique/scientifique.component';
import { SuiviComponent } from './views/suivi/suivi.component';

const routes: Routes = [
  {path:'',redirectTo:'app',pathMatch:'full'},
  {path:"login",component:LoginComponent,canActivate:[LoginGuard]},
  {path:"app",component:MainComponent,canActivate:[AuthGuard],children:[
    {path:'',redirectTo:'animal',pathMatch:'full'},
    {path:'animal',component:AnimalComponent},
    {path:'scientifique',component:ScientifiqueComponent},
    {path:'suivi',component:SuiviComponent},
    {path:'test',component:TestFormComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
