import { Injectable } from '@angular/core';
import { Day } from '../model/day.model';
import { TimesheetModel } from '../model/timesheet.model';
import { Moment } from 'moment';
import * as moment from 'moment';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  timesheets: Map<string, TimesheetModel>;
  activeTimesheet: TimesheetModel;
  private itemDoc: AngularFirestoreDocument<TimesheetModel>;
  item: Observable<TimesheetModel>;

  constructor(private afs: AngularFirestore) {
    this.itemDoc = afs.doc<TimesheetModel>('items/1');
    this.item = this.itemDoc.valueChanges();
  }

  save(ts: TimesheetModel) {
    this.timesheets.set(ts.id, ts);
  }

  submit(ts: TimesheetModel) {
    this.activeTimesheet.submit();
  }
}
