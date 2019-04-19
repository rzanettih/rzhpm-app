import { Component, OnInit, Input } from '@angular/core';
import { Project, DateCalculation } from 'src/app/shared/project.model';


@Component({
  selector: 'app-project-list-item',
  templateUrl: './project-list-item.component.html',
  styleUrls: ['./project-list-item.component.css']
})
export class ProjectListItemComponent implements OnInit {

  constructor() { }

  private _project: Project;
  
  @Input() 
  set projectItem(projectItem: Project){
    this._project = projectItem;
  }

  get projectItem() : Project {
    return this._project ? this._project : new Project();
  }

  private _elapsedDays: number; 
  get elapsedDays() : number {
    return this._elapsedDays;
  }

  private _daysToCompletion: number;
  get daysToCompletion() : number {
    return this._daysToCompletion;
  }

  private _allHolidays: string[];

  @Input()
  set allHolidays(holidays: string[]) {
    this._allHolidays = holidays;
  }

  private _weekDayStart: string;
  get weekDayStart() : string {
    return this._weekDayStart.length > 3 ? this._weekDayStart.substr(0, 3) : this._weekDayStart;
  }

  private _weekDayDelivery: string;
  get weekDayDelivery() : string {
    return this._weekDayDelivery.length > 3 ? this._weekDayDelivery.substr(0, 3) : this._weekDayDelivery;
  }

  ngOnInit() {
    let today: any = new Date();
    today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    this._elapsedDays = DateCalculation.workingDaysBetweenDates(this.projectItem.startDate, today, this._allHolidays);
    this._daysToCompletion = DateCalculation.workingDaysBetweenDates(today, this.projectItem.deliveryDate, this._allHolidays);
    
    this._weekDayStart = DateCalculation.weekDayFromStr(this.projectItem.startDate);
    this._weekDayDelivery = DateCalculation.weekDayFromStr(this.projectItem.deliveryDate);

  }

}
