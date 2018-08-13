import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService} from './service/auth.service'

//Router
import {Routes, RouterModule} from '@angular/router';
import { RoutingModule } from './routing.module';

//Material
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from './material.module';

//UI
import { AppComponent } from './app.component';
import { TimesheetComponent } from './ui/timesheet/timesheet.component';
import { HomeComponent } from './ui/home/home.component';
import {SignupComponent} from './ui/auth/signup/signup.component';
import {LoginComponent} from './ui/auth/login/login.component';
import { DayComponent } from './ui/timesheet/day/day.component';
import { HeaderComponent } from './ui/navigation/header/header.component';
import { SidenavListComponent } from './ui/navigation/sidenav-list/sidenav-list.component';
import { SettingsComponent } from './ui/settings/settings.component';

//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TimesheetComponent,
    SignupComponent,
    LoginComponent,
    DayComponent,
    HeaderComponent,
    SidenavListComponent,
    SettingsComponent,
    //MatTableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    RoutingModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }