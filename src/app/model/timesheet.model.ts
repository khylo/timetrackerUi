import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Day } from './day.model';
import { Moment } from 'moment';
import * as moment from 'moment';


export class TimesheetModel { 
  id:string;
  month:string;
  year: string;
  days: Array<Day> = []
  status: "new" | "active" | "submitted" | "approved";
  dateCreated?: Moment;
  dateSubmited?: Moment;
  dateApproved?: Moment;
  approvedBy:string;

  constuctor(){
    this.dateCreated = moment();
    this.status="active"
  }

  submit(){
    if(this.status=="active" ){
      this.dateSubmited = moment();
      this.status = "submitted"
    }
  }

  approve(){
    if(this.status=="submitted" ){
      this.dateApproved = moment();
      this.status = "approved"
      this.approvedBy = "ModelTestUser"
    }
  }
}
