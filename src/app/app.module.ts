import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './views/login/login.component';
import { MainComponent } from './views/main/main.component';
import { httpInterceptorProviders } from './interceptors';
import { AnimalComponent } from './views/animal/animal.component';
import { SuiviComponent } from './views/suivi/suivi.component';
import { ScientifiqueComponent } from './views/scientifique/scientifique.component';
import { CardsComponent } from './widgets/cards/cards.component';

import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { DividerModule } from "primeng/divider";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";
import { DropdownModule } from "primeng/dropdown";
import { CardModule } from "primeng/card";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { SkeletonModule } from "primeng/skeleton";
import { MenuModule } from "primeng/menu";
import { ContextMenuModule } from "primeng/contextmenu";


//Angular Native modules
const commonModules = [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
]

//Prime NG's modules
const  primesModules = [
  InputTextModule,
  PasswordModule,
  ButtonModule,
  CheckboxModule,
  DividerModule,
  ConfirmDialogModule,
  DropdownModule,
  CardModule,
  ScrollPanelModule,
  SkeletonModule,
  MenuModule,
  ContextMenuModule
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    AnimalComponent,
    SuiviComponent,
    ScientifiqueComponent,
    CardsComponent
  ],
  imports: [
    ...commonModules,
    ...primesModules
  ],
  providers: [
    httpInterceptorProviders,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
