import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Holiday } from '../model/holiday.model';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService implements OnInit, OnDestroy{

  // /StaticData/Holidays     was    /StaticData/Yearly/2018/Holidays/countries/ie
  private static Static = '/StaticData';
  // DEcided we don't need this as staticdata shoudl only change invariably and not be too big
  // private static Holidays = StaticDataService.Static + '/Yearly/{year}/Holidays';
  private static Holidays = 'holidays';
  private _holidays: Holiday;

  private staticData = {};
  private subscriptions: Subscription[] = [];

  constructor(private db: AngularFirestore) {
  }

  ngOnInit() {  }

  ngOnDestroy() {
  }

  staticDataObs() {
    const obs = this.db
      .collection(StaticDataService.Static)
      .snapshotChanges()
      .pipe(
      map(docArray => {
          console.log('Raw data');
          console.log(docArray);
          return docArray.map(doc => { // docArray is complex object .. arrya of QueryDocumentSnapshot .. so simplify
          console.log('staticData from DB');
          console.log(doc.payload.doc.data());
          return {
            id: doc.payload.doc.id,
            value: doc.payload.doc.data()
            /* name: doc.payload.doc.data()['name'],
            month: doc.payload.doc.data()['month'],
            day: doc.payload.doc.data()['day'],
            country: doc.payload.doc.data()['country'],
            year: doc.payload.doc.data()['year']*/
          };
        });
      }));
      return obs;

    /* this.subscriptions.push(
      obs.subscribe((staticData: any[]) => {
        this.staticData = new Map();
        staticData.forEach(element => {
          this.staticData
        });...staticData);
        this.staticData.push.next(this.availableExcercises.slice());
      },
       error => {
         this.uiService.showSnackbar('Fetching excercises failed, please try again later', null, {duration: 5999});
         this.excercisesChanged.next(null);
         console.log(error);
       })
    ); */
  }

  getHolidays() {
    return this.staticData[StaticDataService.Holidays];
  }
}
