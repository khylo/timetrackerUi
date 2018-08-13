import { Component, OnInit, Input } from '@angular/core';
import { Day } from '../../../model/day.model';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  @Input() day: Day;

  constructor() { }

  ngOnInit() {
  }

  fireEvent(e) {
    // (mouseover)='fireEvent($event)'
    console.log(e)
  }

  onDrag() {
    console.log('Drag')
  }

  onDragOver() {
    console.log('DragOVer')
  }

  toggleState() {
    if (!this.day.selectable) {
        return;
    }
    if (typeof this.day.timeClocked === 'undefined' || this.day.timeClocked === 0){
      this.day.timeClocked = 1;
      return;
    }
    // Now it has a vlaue, so we edit
    if (this.day.timeClocked === 1){
      this.day.timeClocked = 0;
      return;
    }
    /*if (this.day.timeClocked === .5){
      this.day.timeClocked = 0;
      return;
    }*/
  }

}
