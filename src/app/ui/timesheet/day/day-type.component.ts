import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-stop-training',
    template: `
        <h1 mat-dialog-title>Choose option</h1>
        <mat-dialog-content>
          <mat-form-field>
              <mat-select placeholder="Select one" [(value)]="selected">
                <mat-option *ngFor="let option of passedData.list" [value]="option">
                  {{option}}
                </mat-option>
              </mat-select>
            </mat-form-field>
        </mat-dialog-content>
        <mat-dialog-actions>
            <button mat-button [mat-dialog-close]="true">Yes</button>
            <button mat-button [mat-dialog-close]="false">No</button>
        </mat-dialog-actions>
    `
})
export class DayTypeComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {

    }

}
