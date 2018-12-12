import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Day } from '../../../model/day.model';
import { MatDialog } from '@angular/material';
import { FormControl  } from '@angular/forms';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  @Input() day: Day;
  dayForm = new FormControl();
  options = [ {name : 'day', value: 1},
              {name : 'half-day', value: 0.5}];

  @Output()
  valueChangeEmitter = new EventEmitter<void>();

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  fireEvent(e) {
    // (mouseover)='fireEvent($event)'
    console.log(e);
  }

  toggleState() {
    if (!this.day.selectable) {
        return;
    }
    if (typeof this.day.timeClocked === 'undefined' || this.day.timeClocked === 0) {
      this.day.timeClocked = 1;
      this.valueChangeEmitter.emit();
      return;
    }
    // Now it has a vlaue, so we edit
    if (this.day.timeClocked === 1) {
      this.day.timeClocked = 0;
      this.valueChangeEmitter.emit();
      return;
    }
  }

}
