import { Component, OnInit, OnDestroy } from '@angular/core';
import { Day } from '../../model/day.model';
import { Moment } from 'moment';
import * as moment from 'moment';
import { Settings } from '../../model/settings.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StaticDataService } from '../../service/static-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit, OnDestroy {
  monthToShow: Moment = moment();
  days: Array<Day> = [];
  dayCols: string[] = [];
  weeksToShow: number;
  displaySunFirst = false;
  full: Day ;
  half: Day ;
  settings: Settings = new Settings();
  formGroup: FormGroup;
  subscriptions: Subscription[] = [];


  constructor(private staticDataService: StaticDataService ) { }

  ngOnInit() {
     /* this.formGroup = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]}),
      password: new FormControl('',
        {validators: [Validators.required]} )
    }); */
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

  getTotalWorked(): number {
    let total = 0;
    this.days.forEach(function(day) {
      total += day.timeClocked;
    });
    return total;
  }

  changeDate(i: number) {
    this.monthToShow.add(i, 'M');
    this.ngOnInit();
  }

  onSelectAll() {
    this.days.forEach((day) =>  {
      if (!day.isWeekend() && !day.isHoliday()) {
        day.setWorked(this.settings.dayWorked, this.settings.timeUnits)
      }
    });
  }

  onClearAll() {
    this.days.forEach( (day) =>  {
        day.setWorked(0, this.settings.timeUnits)
    });
  }



  /* onSubmit() {
    console.log(this.loginForm);
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  } */
}
