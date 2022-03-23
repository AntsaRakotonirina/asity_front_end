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
import { SettingComponent } from './views/setting/setting.component';
import { LocalisationComponent } from './views/setting/localisation/localisation.component';
import { UserComponent } from './views/setting/user/user.component';
import { ParentComponent } from './views/setting/localisation/parent/parent.component';
import { RegionComponent } from './views/setting/localisation/region/region.component';
import { SiteComponent } from './views/setting/localisation/site/site.component';
import { CreateUserComponent } from './forms/user/create-user/create-user.component';
import { SingleAnimalComponent } from './views/animal/single-animal/single-animal.component';
import { HomeComponent } from './views/setting/localisation/home/home.component';
import { CreateSuiviComponent } from './forms/suivi/create-suivi/create-suivi.component';

import { AutoCompleteModule } from "primeng/autocomplete";
import { AccordionModule } from "primeng/accordion";
import { ButtonModule } from "primeng/button";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { CheckboxModule } from "primeng/checkbox";
import { CardModule } from "primeng/card";
import { CalendarModule } from "primeng/calendar";
import { ContextMenuModule } from "primeng/contextmenu";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService, MessageService } from "primeng/api";
import { DividerModule } from "primeng/divider";
import { DropdownModule } from "primeng/dropdown";
import { DialogModule } from "primeng/dialog";
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from "primeng/dynamicdialog";
import { FileUploadModule } from "primeng/fileupload";
import { InputTextModule } from "primeng/inputtext";
import { InputSwitchModule } from "primeng/inputswitch";
import { MenuModule } from "primeng/menu";
import { PasswordModule } from "primeng/password";
import { PaginatorModule } from "primeng/paginator";
import { RadioButtonModule } from "primeng/radiobutton";
import { SpeedDialModule } from "primeng/speeddial";
import { SplitterModule } from "primeng/splitter";
import { SidebarModule } from "primeng/sidebar";
import { SelectButtonModule } from "primeng/selectbutton";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { SkeletonModule } from "primeng/skeleton";
import { ToastModule } from "primeng/toast";
import { TabMenuModule } from "primeng/tabmenu";
import { TableModule } from "primeng/table";
import { NgChartsModule } from 'ng2-charts';
import { ScatterChartComponent } from './widgets/scatter-chart/scatter-chart.component';
import { CreateVerNameComponent } from './forms/animal/create-ver-name/create-ver-name.component';
import { CreateComNameComponent } from './forms/animal/create-com-name/create-com-name.component';
import { CreateSciNameComponent } from './forms/animal/create-sci-name/create-sci-name.component';




//Angular Native modules
const commonModules = [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgChartsModule
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
  ToastModule,
  FileUploadModule,
  TabMenuModule,
  BreadcrumbModule,
  InputSwitchModule,
  TableModule,
  SplitterModule,
  CalendarModule,
  SidebarModule,
  DialogModule,
  AccordionModule,
  RadioButtonModule
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
    UploadComponent,
    SettingComponent,
    LocalisationComponent,
    UserComponent,
    ParentComponent,
    RegionComponent,
    SiteComponent,
    CreateUserComponent,
    SingleAnimalComponent,
    HomeComponent,
    CreateSuiviComponent,
    ScatterChartComponent,
    CreateVerNameComponent,
    CreateComNameComponent,
    CreateSciNameComponent
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
