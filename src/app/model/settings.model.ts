import { TimeClockedUnit } from './timeClockedUnit.model';
import { WorkType } from './workType.model';

export class Settings {
  timeUnits: TimeClockedUnit = TimeClockedUnit.Day;
  showSelectAll = true;
  dayWorked = 1;
  halfDayWorked = 0.5;
  workTypes: Array<WorkType> = [WorkType.days];
}
