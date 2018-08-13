
import { Moment } from 'moment';
import { TimeClockedUnit } from './timeClockedUnit.model'

export class Day {
  holiday: boolean = false;
  timeClocked: number = 0;
  unit: TimeClockedUnit;



  constructor(
      private moment: Moment,
      public selectable:boolean,
      public override?:string
    ) {
      }

  getDisplayValue() {
    if (this.override) {
      return this.override;
    }
    return this.moment.date();

  }

  setWorked(worked: number, unit: TimeClockedUnit) {
      if(this.selectable){
        this.timeClocked = worked;
        this.unit = unit;
      }
  }

  isWeekend() {
    return this.moment.isoWeekday() === 6 || this.moment.isoWeekday() === 7;
  }

  isHoliday() {
    return this.holiday;
  }

}
