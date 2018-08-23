import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
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
  private static Holidays = StaticDataService.Static + '/Holidays';

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
        // throw new Error();
          return docArray.map(doc => {
          console.log('staticData from DB');
          console.log(doc.payload.doc.data());
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data()['name'],
            month: doc.payload.doc.data()['month'],
            day: doc.payload.doc.data()['day'],
            country: doc.payload.doc.data()['country'],
            year: doc.payload.doc.data()['year']
          };
        });
      }));
      return obs;

    /* this.subscriptions.push(
      obs.subscribe((holidays: Holiday[]) => {
        this.excercisesChanged.next(this.availableExcercises.slice());
      },
       error => {
         this.uiService.showSnackbar('Fetching excercises failed, please try again later', null, {duration: 5999});
         this.excercisesChanged.next(null);
         console.log(error);
       })
    ); */
  }
}
