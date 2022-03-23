import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestFormComponent } from './forms/test-form/test-form.component';
import { AdminGuard } from './guards/admin.guard';
import { AnimalUpdateGuard } from './guards/animal-update.guard';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { AnimalComponent } from './views/animal/animal.component';
import { SingleAnimalComponent } from './views/animal/single-animal/single-animal.component';
import { LoginComponent } from './views/login/login.component';
import { MainComponent } from './views/main/main.component';
import { ScientifiqueComponent } from './views/scientifique/scientifique.component';
import { HomeComponent } from './views/setting/localisation/home/home.component';
import { LocalisationComponent } from './views/setting/localisation/localisation.component';
import { SettingComponent } from './views/setting/setting.component';
import { UserComponent } from './views/setting/user/user.component';
import { SuiviComponent } from './views/suivi/suivi.component';

const settingRoutes:Routes = [
  {path:'',redirectTo:'localisations',pathMatch:'full'},
  {path:'localisations',component:LocalisationComponent,children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent}
  ]},
  {path:'user',component:UserComponent}
]

const appRoutes: Routes = [
  {path:'',redirectTo:'animal',pathMatch:'full'},
  {path:'animal',component:AnimalComponent},
  {path:'animal/:id',component:SingleAnimalComponent,canDeactivate:[AnimalUpdateGuard]},
  {path:'scientifique',component:ScientifiqueComponent},
  {path:'suivi',component:SuiviComponent},
  {path:'settings',component:SettingComponent,canActivate:[AdminGuard],children:settingRoutes},
  {path:'test',component:TestFormComponent}
];

const routes: Routes = [
  {path:'',redirectTo:'app',pathMatch:'full'},
  {path:"login",component:LoginComponent,canActivate:[LoginGuard]},
  {path:"app",component:MainComponent,canActivate:[AuthGuard],children:appRoutes}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
