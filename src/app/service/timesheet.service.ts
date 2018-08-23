import { Injectable } from '@angular/core';
import { Day } from '../model/day.model';
import { TimesheetModel } from '../model/timesheet.model';
import { Moment } from 'moment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  timesheets:TimesheetModel[] = [];
  activeTimesheet: TimesheetModel;

  constructor() { }

  submitTimesheet(){
    this.activeTimesheet.submit();
  }
}
