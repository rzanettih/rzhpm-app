import { Injectable } from '@angular/core';
import { Project } from '../project.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public itemData: Project;
  public projectRootNode: string = "project";
  public holidaysRootNode: string = "holidays";
  public listOfAllProjects: Project[];
  public listOfAllProjectsFiltered: Project[];
  public listOfAllHolidays: string[];

  constructor(private database: AngularFirestore) {
    this.listOfAllHolidays = [];
    this.getAllHolidays();
  }

  getAllProjects(){
    return this.database.collection(this.projectRootNode, ref => ref.orderBy('timestamp', 'desc'))
     .snapshotChanges();
  }

  getAllHolidays(){

    this.database.collection(this.holidaysRootNode).snapshotChanges().subscribe(returnArray => {
      let items: any[] = returnArray.map(item => {

        return item.payload.doc.data();

      });

      // every item returned from the db is a year and the dates are in the array within
      for (let years in items) {
        for (let dates in items[years]) {
          // mvp is only returning an array of dates strings.. further on it could have a proper object
          if(this.listOfAllHolidays.indexOf(dates) < 0)
            this.listOfAllHolidays.push(dates);
          // console.log(dates + ":" + items[years][dates]);
        }  
      }

      // console.log(this.listOfAllHolidays);

    });
  }
}
