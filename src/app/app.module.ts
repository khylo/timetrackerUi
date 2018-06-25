import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';

//Router
import {Routes, RouterModule} from '@angular/router';
import { RoutingModule } from './routing.module';

//Material
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from './material.module';
import { MatIconModule } from '@angular/material';

//UI
import { AppComponent } from './app.component';
import { TimesheetComponent } from './ui/timesheet/timesheet.component';
import { HomeComponent } from './ui/home/home.component';
import {SignupComponent} from './ui/auth/signup/signup.component';
import {LoginComponent} from './ui/auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TimesheetComponent,
    SignupComponent,
    LoginComponent,
    //MatTableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    LayoutModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }