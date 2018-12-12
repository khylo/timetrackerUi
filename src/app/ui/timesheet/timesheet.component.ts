import { Component, OnInit, OnDestroy } from '@angular/core';
import { Day } from '../../model/day.model';
import { Moment } from 'moment';
import * as moment from 'moment';
import { Settings } from '../../model/settings.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StaticDataService } from '../../service/static-data.service';
import { Subscription } from 'rxjs';
import { TimesheetService } from '../../service/timesheet.service';
import { TimesheetModel } from 'src/app/model/timesheet.model';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit, OnDestroy {
  monthToShow: Moment = moment();
  days: Array<Day> = [];
  selectedDay: Day;
  dayCols: string[] = [];
  weeksToShow: number;
  displaySunFirst = false;
  full: Day ;
  half: Day ;
  settings: Settings = new Settings();
  formGroup: FormGroup;
  subscriptions: Subscription[] = [];
  totalWeekDays = 0;
  totalHolidays = 0;
  totalSat = 0;
  totalSun = 0;
  totalWeekend = 0;
  totalWorked = 0;
  totalOnCall: number;
  timeWorked: number;
  updateTimeWorked: number;
  timeOnCall: number;
  updateTimeOnCall: number;
  showEditBox = false;


  constructor(private staticDataService: StaticDataService, private timesheetService: TimesheetService ) { }

  ngOnInit() {
     this.formGroup = new FormGroup({
      days: new FormControl('', {
        validators: [Validators.required, Validators.email]}),
      password: new FormControl('',
        {validators: [Validators.required]} )
    });
    this.subscriptions.push(
      this.staticDataService.staticDataObs().subscribe( (data) => {
          console.log('StaticData change');
          console.log(data);
        },
         error => {
           console.log('Error getting data fromn DB');
           console.log(error);
      })
    );
    const startOfMonth = this.monthToShow.startOf('month'); // moment(this.year+monthStr+"01","YYYYMMDD")
    let firstDayOfMonth: number;
    if (this.displaySunFirst) {
      firstDayOfMonth = startOfMonth.day(); // REturns 0 - 6 0 = Sunday, if want other way use .isoWeekday() // returns 1 - 7
    } else {
      firstDayOfMonth = startOfMonth.isoWeekday(); // REturns 1 - 7  = Sunday, if want other way use .isoWeekday() // returns 1 - 7
    }
    const lastDayOfMonth = startOfMonth.clone().endOf('month').date();
    this.weeksToShow = ( (firstDayOfMonth + lastDayOfMonth) / 7 >> 0);
    if ((firstDayOfMonth + lastDayOfMonth) % 7 !== 0) {
      this.weeksToShow += 1;
    }

    let dayToShow: Moment;
    if (this.displaySunFirst) {
      dayToShow = startOfMonth.clone().startOf('week');
    } else {
      dayToShow = startOfMonth.clone().startOf('isoWeek');
    }

    // console.log("First day to Show = "+dayToShow.format("YYYY-MM-DD")+" - "+dayToShow.format('dddd'))  ;
    let selectable: boolean;

    this.dayCols = [];
    for (let i = 0; i < 7 ; i++) {
      this.dayCols.push(moment.weekdaysMin(this.displaySunFirst ? i : (1 + i) % 7));
    }
    // console.log("WeeksToShow "+this.weeksToShow+" : dayToShow "+dayToShow.format()+" : DayCol "+this.dayCols);
    this.days = [];
    for (let w = 0; w < this.weeksToShow; w++) {
      for (let d = 0; d < 7; d++) {
        selectable = (dayToShow.month() === startOfMonth.month());

        this.days.push(new Day(dayToShow.clone(), selectable));
        dayToShow.add(1, 'days');
      }
    }

    this.full = new Day(moment('' + this.monthToShow.year() + this.monthToShow.month() + moment().date(), 'YYYMMDD'), false, 'Full Day');
    this.full.timeClocked = this.settings.dayWorked;
    this.half = new Day(moment('' + this.monthToShow.year() + this.monthToShow.month() + moment().date(), 'YYYMMDD'), false, 'Half Day');
    this.half.timeClocked = this.settings.halfDayWorked;
  }

  ngOnDestroy () {

  }

  onSave() {
    console.log('Saving');
    this.timesheetService.save({id:"hardwired in component"} as TimesheetModel);
  }

  onSubmit() {
    console.log('Submitting');
    console.log(this.formGroup);
    this.timesheetService.submit({id:"hardwired in component"}  as TimesheetModel);
  }

  selectDay(day: Day) {
    console.log('Selecting Day');
    console.log(day);
    this.selectedDay = day;
    this.updateTimeWorked = day.timeClocked;
    this.updateTimeOnCall = day.timeOnCall;
    this.showEditBox = true;
  }

  getTotalWorked() {
    this.totalWeekDays = 0;
    this.totalHolidays = 0;
    this.totalSat = 0;
    this.totalSun = 0;
    this.days.forEach( (day) => {
      if (day.isHoliday()) {
        this.totalHolidays += day.timeClocked;
      }
      if (day.isSat()) {
        this.totalSat += day.timeClocked;
      }
      if (day.isSun()) {
        this.totalSun += day.timeClocked;
      }
      if (day.isWeekDay()) {
        this.totalWeekDays += day.timeClocked;
      }
      if (day.timeOnCall > 0) {
        this.totalOnCall += day.timeOnCall;
      }
    });
    this.totalWeekend = this.totalSat + this.totalSun;
    this.totalWorked = this.totalSat + this.totalSun + this.totalWeekDays + this.totalHolidays;
  }

  changeDate(i: number) {
    this.monthToShow.add(i, 'M');
    this.ngOnInit();
  }

  onSelectAll() {
    this.days.forEach((day) =>  {
      if (!day.isWeekend() && !day.isHoliday()) {
        day.setWorked(this.settings.dayWorked, this.settings.timeUnits);
      }
    });
    this.getTotalWorked();
  }

  onClearAll() {
    this.days.forEach( (day) =>  {
        day.setWorked(0, this.settings.timeUnits);
    });
    this.getTotalWorked();
  }

  onUpdateTimeWorked(event) {
    if (event.key === 'Enter') {
      this.selectedDay.setWorked(this.updateTimeWorked);
      this.showEditBox = false;
    }
    if (event.key === 'Escape') {
      this.showEditBox = false;
    }
  }

  onUpdateTimeOnCall(event) {
    if (event.key === 'Enter') {
      this.selectedDay.setOnCall(this.updateTimeOnCall);
      this.showEditBox = false;
    }
    if (event.key === 'Escape') {
      this.showEditBox = false;
    }
  }



  onKeydown(event) {
    console.log(event);
  }
}
