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
import { TestFormComponent } from './forms/test-form/test-form.component';
import { CreateAnimalFormComponent } from './forms/animal/create-animal-form/create-animal-form.component';
import { CreateScientifiqueFormComponent } from './forms/scientifique/create-scientifique-form/create-scientifique-form.component';
import { UpdateScientifiqueFormComponent } from './forms/scientifique/update-scientifique-form/update-scientifique-form.component';
import { UploadComponent } from './forms/upload-component/upload-component.component';

import { AutoCompleteModule } from "primeng/autocomplete";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { CardModule } from "primeng/card";
import { ContextMenuModule } from "primeng/contextmenu";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService, MessageService } from "primeng/api";
import { DividerModule } from "primeng/divider";
import { DropdownModule } from "primeng/dropdown";
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from "primeng/dynamicdialog";
import { FileUploadModule } from "primeng/fileupload";
import { InputTextModule } from "primeng/inputtext";
import { InputMaskModule } from "primeng/inputmask";
import { MenuModule } from "primeng/menu";
import { PasswordModule } from "primeng/password";
import { PaginatorModule } from "primeng/paginator";
import { SpeedDialModule } from "primeng/speeddial";
import { SelectButtonModule } from "primeng/selectbutton";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { SkeletonModule } from "primeng/skeleton";
import { ToastModule } from "primeng/toast";

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
  ContextMenuModule,
  SpeedDialModule,
  AutoCompleteModule,
  SelectButtonModule,
  DynamicDialogModule,
  PaginatorModule,
  InputMaskModule,
  ToastModule,
  FileUploadModule
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    AnimalComponent,
    SuiviComponent,
    ScientifiqueComponent,
    CardsComponent,
    TestFormComponent,
    CreateAnimalFormComponent,
    CreateScientifiqueFormComponent,
    UpdateScientifiqueFormComponent,
    UploadComponent
  ],
  imports: [
    ...commonModules,
    ...primesModules
  ],
  providers: [
    httpInterceptorProviders,
    ConfirmationService,
    DialogService,
    DynamicDialogRef,
    MessageService,
    DynamicDialogConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
