import { Component, OnInit } from '@angular/core';
import { DateCalculation } from 'src/app/shared/project.model';
import { ProjectService } from 'src/app/shared/services/project.service';
import { ResourceService } from 'src/app/shared/services/resource.service';
import { Resource } from 'src/app/shared/resource.model';

@Component({
  selector: 'app-resource-allocation-assessment',
  templateUrl: './resource-allocation-assessment.component.html',
  styleUrls: ['./resource-allocation-assessment.component.css']
})
export class ResourceAllocationAssessmentComponent implements OnInit {

  constructor(private projectService: ProjectService, private resourceService: ResourceService) { }

  private allSelectedResources: Resource[];

  private allResourcesForDDL: any[];

  private resourceAllocationAssessmentObject: {
      dateStart: string,
      dateEnd: string,
      workDays: number,
      hours: number
  };
  
  ngOnInit() {
    this.allSelectedResources = [];
    this.initObj();
    this.initResourceList();

    
  }

  initObj() {
    this.resourceAllocationAssessmentObject = {
      dateStart: null,
      dateEnd: null,
      workDays: 0,
      hours: 0
    };
  }

  initResourceList() {
    this.resourceService.fulfillListOfAllResources().then(qtt => {
      // console.log(`List of all resources and filtered resources resulted on ${qtt} resources`);
      this.onAllResourcesFilter(null);
    });
  }

  calculateTimeBetweenDates(dateStart: any, dateEnd: any, trigger: any) {
    if(dateStart != "" && dateEnd != ""){

      if(!this.projectService.listOfAllHolidays || this.projectService.listOfAllHolidays.length <= 0) {
        this.projectService.getAllHolidays();
      }

      this.resourceAllocationAssessmentObject.workDays = DateCalculation.workingDaysBetweenDates(dateStart, dateEnd, this.projectService.listOfAllHolidays);
      this.resourceAllocationAssessmentObject.hours = (this.resourceAllocationAssessmentObject.workDays && this.resourceAllocationAssessmentObject.workDays > 0 ? this.resourceAllocationAssessmentObject.workDays * 8 : null);

    }

  }

  onAllResourcesFilter(event: any) {
    let textFilter: string = event && event.target ? event.target.value : "";
    this.resourceService.filterListByText(textFilter, this.allSelectedResources);

    this.allResourcesForDDL = this.resourceService.listOfAllResources.map(resource => {
      return {id: resource.id, text: resource.fullName};
    });

  }

  onSelectResource(resource: Resource){
    this.allSelectedResources.push(resource);
    let textFilter: string = (<HTMLInputElement>document.getElementById("txtAllResourcesFilter")).value;
    this.resourceService.filterListByText(textFilter, this.allSelectedResources);
  }

  onSelect(event: any) {
    console.log(event);
  }

} 
