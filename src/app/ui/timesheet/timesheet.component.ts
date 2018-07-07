import { Component, OnInit } from '@angular/core';
import { Day } from '../../model/day.model';
import { Moment } from 'moment';
import * as moment from 'moment';
import { forEach } from '@angular/router/src/utils/collection';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  monthToShow : Moment = moment()
  //year: number = 2018
  //month: number = 6
  days: Array<Day> = []
  dayCols: string[] = [];
  weeksToShow: number;
  displaySunFirst:boolean=false;
  full: Day ;
  half: Day ;

  constructor() { }

  ngOnInit() {
    /*var monthStr: string
    if(this.month<10)
      monthStr = "0"+this.month;
    else
      monthStr= ""+this.month;*/
    var startOfMonth = this.monthToShow.startOf('month');//moment(this.year+monthStr+"01","YYYYMMDD")
    var firstDayOfMonth:number;
    if(this.displaySunFirst)
      firstDayOfMonth = startOfMonth.day(); //REturns 0 - 6 0 = Sunday, if want other way use .isoWeekday() // returns 1 - 7
    else
      firstDayOfMonth = startOfMonth.isoWeekday(); //REturns 1 - 7  = Sunday, if want other way use .isoWeekday() // returns 1 - 7

    var lastDayOfMonth = startOfMonth.clone().endOf('month').date();
    this.weeksToShow = ((firstDayOfMonth+lastDayOfMonth)/7>>0)
    if((firstDayOfMonth+lastDayOfMonth)%7 != 0)
      this.weeksToShow+=1;

    var dayToShow : Moment;
    if(this.displaySunFirst)
      dayToShow = startOfMonth.clone().startOf('week');
    else
      dayToShow = startOfMonth.clone().startOf('isoWeek');

    //console.log("First day to Show = "+dayToShow.format("YYYY-MM-DD")+" - "+dayToShow.format('dddd'))  ;
    var selectable:boolean;

    this.dayCols = [];
    for(var i=0;i<7;i++){
      this.dayCols.push(moment.weekdaysMin(this.displaySunFirst?i:(1+i)%7));
    }
    //console.log("WeeksToShow "+this.weeksToShow+" : dayToShow "+dayToShow.format()+" : DayCol "+this.dayCols);
    this.days = []
    for(var w=0;w<this.weeksToShow;w++){
      for(var d=0;d<7;d++){
        selectable=(dayToShow.month()==startOfMonth.month());

        this.days.push(new Day(dayToShow.year(), dayToShow.month(), dayToShow.date(), selectable));
        dayToShow.add(1,'days');
      }
    }

    this.full = new Day(this.monthToShow.year(), this.monthToShow.month(), moment().date(), false, "Full Day");
    this.full.timeClocked=1;
    this.half = new Day(this.monthToShow.year(), this.monthToShow.month(), moment().date(), false, "Half Day");
    this.half.timeClocked=0.5;

    console.log(this.days);
  }

  getTotalWorked(): number{
    var total:number=0;
    this.days.forEach(function(day){
      total+=day.timeClocked;
    });
    return total;
  }

  changeDate(i:number){
    console.log("Changing date by "+1+  " from "+this.monthToShow.format('YYYY-MM-DD'))
    this.monthToShow.add(i,'M');
    console.log("To "+this.monthToShow.format('YYYY-MM-DD'))
    this.ngOnInit();
  }

}
