import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './ui/home/home.component';
import {TimesheetComponent} from './ui/timesheet/timesheet.component';
import {SettingsComponent} from './ui/settings/settings.component';
import {SignupComponent} from './ui/auth/signup/signup.component';
import {LoginComponent} from './ui/auth/login/login.component';

const routes: Routes = [
  { path: 'signup',     component: SignupComponent  },
  { path: 'login',      component: LoginComponent  },
  { path: 'timesheet',   component: TimesheetComponent  },
  { path: 'settings',   component: SettingsComponent  },
  { path: '**',         component: HomeComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
