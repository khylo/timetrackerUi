
import { Moment } from 'moment';
import { TimeClockedUnit } from './timeClockedUnit.model';

export class Day {
  holiday = false;
  timeClocked = 0;
  timeOnCall = 0;
  unit: TimeClockedUnit;

  constructor(
      private moment: Moment,
      public selectable: boolean,
      public override?: string
    ) {
      }

  getDisplayValue() {
    if (this.override) {
      return this.override;
    }
    return this.moment.date();

  }

  setWorked(worked: number, unit: TimeClockedUnit = TimeClockedUnit.Day) {
      if (this.selectable) {
        this.timeClocked = worked;
        this.unit = unit;
      }
  }

  setOnCall(worked: number, unit: TimeClockedUnit = TimeClockedUnit.Day) {
    if (this.selectable) {
      this.timeOnCall = worked;
      this.unit = unit;
    }
  }

  getMoment() {
    return this.moment;
  }

  isWeekend() {
    return this.moment.isoWeekday() === 6 || this.moment.isoWeekday() === 7;
  }

  isSat() {
    return this.moment.isoWeekday() === 6;
  }

  isSun() {
    return this.moment.isoWeekday() === 7;
  }

  isHoliday() {
    return this.holiday;
  }

  isWeekDay() {
    return !this.isWeekend() && !this.isHoliday();
  }

}
