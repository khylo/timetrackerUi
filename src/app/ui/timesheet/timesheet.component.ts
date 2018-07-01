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

  year: number = 2018
  month: number = 6
  days: Array<Day> = []
  dayCols: string[];
  weeksToShow: number;
  displaySunFirst:boolean=false;

  constructor() { }

  ngOnInit() {
    var monthStr: string
    if(this.month<10) 
      monthStr = "0"+this.month;
    else
      monthStr= ""+this.month;
    var startOfMonth = moment(this.year+monthStr+"01","YYYYMMDD")
    var firstDayOfMonth:number;
    if(this.displaySunFirst)
      firstDayOfMonth = startOfMonth.day(); //REturns 0 - 6 0 = Sunday, if want other way use .isoWeekday() // returns 1 - 7
    else
      firstDayOfMonth = startOfMonth.isoWeekday(); //REturns 1 - 7  = Sunday, if want other way use .isoWeekday() // returns 1 - 7
    /*
    console.log("First day of month is "+firstDayOfMonth)
    console.log("moment().format('MMMM Do YYYY, h:mm:ss a');",moment().format('MMMM Do YYYY, h:mm:ss a'));
    console.log("moment().format('ddd');                   ",moment().format('ddd'));                  
    console.log("moment().format('MMM Do YY');              ",moment().format("MMM Do YY"));              
    console.log("moment().format('YYYY [escaped] YYYY');    ",moment().format('YYYY [escaped] YYYY'));   
    console.log("moment().format();                         ",moment().format());     
    console.log('moment("20111031", "YYYYMMDD")',moment("20111031", "YYYYMMDD"))                   ;
    console.log('moment("20111031", "YYYYMMDD").format("YYYYMMDD")',moment("20111031", "YYYYMMDD").format("YYYYMMDD"));
    */

    var lastDayOfMonth = startOfMonth.clone().endOf('month').date();
    this.weeksToShow = ((firstDayOfMonth+lastDayOfMonth)/7>>0)
    if((firstDayOfMonth+lastDayOfMonth)%7 != 0)
      this.weeksToShow+=1;

    var dayToShow : Moment;
    if(this.displaySunFirst)
      dayToShow = startOfMonth.clone().startOf('week');
    else
      dayToShow = startOfMonth.clone().startOf('isoWeek');
    var selectable=false;

    this.dayCols = Array(7);
    for(var i=0;i<7;i++){
      this.dayCols.push(moment.weekdaysMin(this.displaySunFirst?i:(1+i)%7));
    }
    //console.log("WeeksToShow "+this.weeksToShow+" : dayToShow "+dayToShow.format())
    for(var w=0;w<this.weeksToShow;w++){
      for(var d=0;d<7;d++){
        selectable=(dayToShow.month()==startOfMonth.month());
          
        this.days.push(new Day(dayToShow.year(), dayToShow.month(), dayToShow.date(), selectable));
        dayToShow.add(1,'days');
      }
    }


    console.log(this.days);
  }

  getTotalWorked(): number{
    var total:number=0;
    this.days.forEach(function(day){
      total+=day.timeClocked;
    });
    return total;
  }

}
